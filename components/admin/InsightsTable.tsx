"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteInsight, setInsightStatus } from "@/app/admin/actions";
import type { Insight } from "@/lib/db/schema";

export function InsightsTable({ insights }: { insights: Insight[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function mutate(fn: () => Promise<unknown>) {
    startTransition(async () => {
      await fn();
      router.refresh();
    });
  }

  if (!insights.length) {
    return (
      <div className="rounded-[16px] border border-dashed border-[rgba(22,21,15,0.18)] px-6 py-16 text-center text-[15px] text-smoke">
        No insights yet.{" "}
        <Link href="/admin/insights/new" className="text-ink underline">
          Create the first one
        </Link>
        .
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[16px] border border-[rgba(22,21,15,0.1)]">
      <table className="w-full border-collapse text-left text-[14px]">
        <thead className="bg-panel-warm text-[12.5px] text-smoke">
          <tr>
            <th className="px-4 py-3 font-medium">Title</th>
            <th className="hidden px-4 py-3 font-medium sm:table-cell">Status</th>
            <th className="hidden px-4 py-3 font-medium md:table-cell">Updated</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {insights.map((insight) => (
            <tr
              key={insight.id}
              className="border-t border-[rgba(22,21,15,0.08)] bg-white"
            >
              <td className="px-4 py-4">
                <div className="font-medium tracking-[-0.01em]">{insight.title}</div>
                <div className="mt-1 text-[12.5px] text-smoke">
                  {insight.tag}
                  {insight.featured ? " · Featured" : ""}
                </div>
              </td>
              <td className="hidden px-4 py-4 capitalize sm:table-cell">
                <span
                  className={
                    insight.status === "published" ? "text-ink" : "text-smoke"
                  }
                >
                  {insight.status}
                </span>
              </td>
              <td className="hidden px-4 py-4 text-smoke md:table-cell">
                {insight.updatedAt.toLocaleDateString()}
              </td>
              <td className="px-4 py-4">
                <div className="flex flex-wrap gap-3">
                  <Link
                    href={`/admin/insights/${insight.id}`}
                    className="border-b border-[rgba(22,21,15,0.25)] pb-0.5 hover:border-ember"
                  >
                    Edit
                  </Link>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() =>
                      mutate(() =>
                        setInsightStatus(
                          insight.id,
                          insight.status === "published" ? "draft" : "published",
                        ),
                      )
                    }
                    className="border-b border-[rgba(22,21,15,0.25)] pb-0.5 hover:border-ember disabled:opacity-50"
                  >
                    {insight.status === "published" ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => {
                      if (!confirm("Delete this insight?")) return;
                      mutate(() => deleteInsight(insight.id));
                    }}
                    className="border-b border-[rgba(199,74,38,0.35)] pb-0.5 text-ember disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
