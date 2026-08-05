import type { Metadata } from "next";
import Link from "next/link";
import {
  getNewContactCount,
  getOpenTaskCount,
} from "@/lib/data/admin-queries";
import { getAllAdminInsights } from "@/lib/data/insights-db";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export default async function AdminHomePage() {
  const [insights, newContacts, openTasks] = await Promise.all([
    getAllAdminInsights(),
    getNewContactCount(),
    getOpenTaskCount(),
  ]);
  const published = insights.filter((i) => i.status === "published").length;
  const drafts = insights.length - published;

  return (
    <div>
      <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Overview
      </h1>
      <p className="mt-3 mb-10 max-w-[520px] text-[15px] leading-[1.65] text-[rgba(22,21,15,0.62)]">
        Insights, contact submissions, tasks, and site settings for
        levantate.in.
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Insights" value={insights.length} href="/admin/insights" />
        <Stat label="Published" value={published} href="/admin/insights" />
        <Stat label="New contacts" value={newContacts} href="/admin/contacts" />
        <Stat label="Open tasks" value={openTasks} href="/admin/tasks" />
      </div>

      <p className="mt-5 mb-0 text-[14px] text-[rgba(22,21,15,0.55)]">
        {drafts} draft{drafts === 1 ? "" : "s"} waiting to publish
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/admin/insights/new"
          className="button-dark inline-flex items-center rounded-full px-6 py-3 text-[14.5px] font-medium"
        >
          New insight
        </Link>
        <Link
          href="/admin/contacts"
          className="button-outline-dark inline-flex items-center rounded-full px-6 py-3 text-[14.5px] font-medium"
        >
          Contact inbox
        </Link>
        <Link
          href="/admin/settings"
          className="button-outline-dark inline-flex items-center rounded-full px-6 py-3 text-[14.5px] font-medium"
        >
          Site settings
        </Link>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
}: {
  label: string;
  value: number;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-[16px] border border-[rgba(22,21,15,0.08)] bg-panel-warm px-5 py-5 transition-colors hover:border-[rgba(22,21,15,0.18)] hover:bg-[#e8e2d6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <div className="text-[13px] font-medium text-[rgba(22,21,15,0.55)]">
        {label}
      </div>
      <div className="mt-3 text-[34px] leading-none font-semibold tracking-[-0.04em] text-ink">
        {value}
      </div>
    </Link>
  );
}
