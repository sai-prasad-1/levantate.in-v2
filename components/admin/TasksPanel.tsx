"use client";

import Link from "next/link";
import { FormEvent, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createTask, deleteTask, setTaskStatus } from "@/app/admin/crm-actions";

type TaskRow = {
  id: string;
  title: string;
  body: string | null;
  status: "open" | "done";
  dueAt: string | null;
  contactMessageId: string | null;
  createdAt: string;
};

export function TasksPanel({
  tasks,
  highlightId,
}: {
  tasks: TaskRow[];
  highlightId?: string;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dueAt, setDueAt] = useState("");
  const [error, setError] = useState<string | null>(null);

  function onCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    startTransition(async () => {
      try {
        await createTask({
          title,
          body: body || null,
          dueAt: dueAt || null,
        });
        setTitle("");
        setBody("");
        setDueAt("");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Could not create task");
      }
    });
  }

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.85fr_1.15fr]">
      <form
        onSubmit={onCreate}
        className="h-fit rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-panel-warm p-6"
      >
        <h2 className="m-0 text-[18px] font-semibold tracking-[-0.02em]">
          New task
        </h2>
        <div className="mt-5 flex flex-col gap-4">
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Notes</span>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              className="resize-y rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
            />
          </label>
          <label className="flex flex-col gap-2">
            <span className="text-[13px] text-smoke">Due date</span>
            <input
              type="date"
              value={dueAt}
              onChange={(e) => setDueAt(e.target.value)}
              className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
            />
          </label>
        </div>
        {error ? (
          <p className="mt-3 mb-0 text-[13px] text-ember" role="alert">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          disabled={pending}
          className="button-dark mt-5 rounded-full px-5 py-2.5 text-[14px] font-medium disabled:opacity-60"
        >
          {pending ? "Adding…" : "Add task"}
        </button>
      </form>

      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="m-0 rounded-[16px] border border-dashed border-[rgba(22,21,15,0.15)] px-6 py-10 text-center text-[14.5px] text-smoke">
            No tasks yet. Create one here or from a contact submission.
          </p>
        ) : (
          tasks.map((task) => {
            const highlighted = highlightId === task.id;
            return (
              <article
                key={task.id}
                className={`rounded-[16px] border bg-white px-5 py-4 ${
                  highlighted
                    ? "border-ember"
                    : "border-[rgba(22,21,15,0.1)]"
                } ${task.status === "done" ? "opacity-65" : ""}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3
                      className={`m-0 text-[16px] font-semibold tracking-[-0.02em] ${
                        task.status === "done" ? "line-through" : ""
                      }`}
                    >
                      {task.title}
                    </h3>
                    {task.body ? (
                      <p className="mt-2 mb-0 whitespace-pre-wrap text-[14px] leading-[1.55] text-[rgba(22,21,15,0.65)]">
                        {task.body}
                      </p>
                    ) : null}
                    <div className="mt-3 flex flex-wrap gap-3 text-[12.5px] text-smoke">
                      <span>
                        {new Date(task.createdAt).toLocaleDateString()}
                      </span>
                      {task.dueAt ? (
                        <span>
                          Due {new Date(task.dueAt).toLocaleDateString()}
                        </span>
                      ) : null}
                      {task.contactMessageId ? (
                        <Link
                          href={`/admin/contacts/${task.contactMessageId}`}
                          className="border-b border-[rgba(22,21,15,0.2)] pb-0.5 hover:border-ember"
                        >
                          Linked contact
                        </Link>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() =>
                        startTransition(async () => {
                          await setTaskStatus(
                            task.id,
                            task.status === "open" ? "done" : "open",
                          );
                          router.refresh();
                        })
                      }
                      className="rounded-full border border-[rgba(22,21,15,0.15)] px-3 py-1.5 text-[12.5px] hover:border-ink disabled:opacity-60"
                    >
                      {task.status === "open" ? "Mark done" : "Reopen"}
                    </button>
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => {
                        if (!window.confirm("Delete this task?")) return;
                        startTransition(async () => {
                          await deleteTask(task.id);
                          router.refresh();
                        });
                      }}
                      className="rounded-full px-3 py-1.5 text-[12.5px] text-ember hover:underline disabled:opacity-60"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
}
