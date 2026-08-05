import type { Metadata } from "next";
import { TasksPanel } from "@/components/admin/TasksPanel";
import { getTasks } from "@/lib/data/admin-queries";

type PageProps = {
  searchParams: Promise<{ highlight?: string }>;
};

export const metadata: Metadata = {
  title: "Tasks · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminTasksPage({ searchParams }: PageProps) {
  const { highlight } = await searchParams;
  const tasks = await getTasks();

  return (
    <div>
      <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Tasks
      </h1>
      <p className="mt-3 mb-10 max-w-[520px] text-[15px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
        Follow-ups and internal todos. Create them here or from a contact
        submission.
      </p>
      <TasksPanel
        highlightId={highlight}
        tasks={tasks.map((task) => ({
          id: task.id,
          title: task.title,
          body: task.body,
          status: task.status,
          dueAt: task.dueAt?.toISOString() ?? null,
          contactMessageId: task.contactMessageId,
          createdAt: task.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
