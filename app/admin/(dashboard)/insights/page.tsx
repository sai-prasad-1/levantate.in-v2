import type { Metadata } from "next";
import Link from "next/link";
import { InsightsTable } from "@/components/admin/InsightsTable";
import { getAllAdminInsights } from "@/lib/data/insights-db";

export const metadata: Metadata = {
  title: "Insights · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminInsightsPage() {
  const insights = await getAllAdminInsights();

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
            Insights
          </h1>
          <p className="mt-2 mb-0 text-[15px] text-[rgba(22,21,15,0.55)]">
            Draft, publish, and feature studio notes.
          </p>
        </div>
        <Link
          href="/admin/insights/new"
          className="button-dark rounded-full px-5 py-2.5 text-[14px] font-medium"
        >
          New insight
        </Link>
      </div>
      <InsightsTable insights={insights} />
    </div>
  );
}
