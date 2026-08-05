"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useId, useState, useTransition } from "react";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { saveInsight } from "@/app/admin/actions";
import { slugifyTitle } from "@/lib/utils/slug";

type InsightFormValues = {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tag: string;
  coverImageUrl: string;
  status: "draft" | "published";
  featured: boolean;
  publishedAt?: string | null;
};

export function InsightEditorForm({
  initial,
}: {
  initial?: Partial<InsightFormValues>;
}) {
  const router = useRouter();
  const formId = useId();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [uploadingCover, setUploadingCover] = useState(false);
  const [form, setForm] = useState<InsightFormValues>({
    id: initial?.id,
    title: initial?.title ?? "",
    slug: initial?.slug ?? "",
    excerpt: initial?.excerpt ?? "",
    content: initial?.content ?? "<p></p>",
    tag: initial?.tag ?? "Engineering",
    coverImageUrl: initial?.coverImageUrl ?? "",
    status: initial?.status ?? "draft",
    featured: initial?.featured ?? false,
    publishedAt: initial?.publishedAt ?? null,
  });

  function update<K extends keyof InsightFormValues>(
    key: K,
    value: InsightFormValues[K],
  ) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "title" && !slugTouched) {
        next.slug = slugifyTitle(String(value));
      }
      return next;
    });
    setSaved(false);
  }

  async function onUploadCover(file: File) {
    setUploadingCover(true);
    setError(null);
    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/admin/media", { method: "POST", body });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      update("coverImageUrl", data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Cover upload failed");
    } finally {
      setUploadingCover(false);
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSaved(false);
    startTransition(async () => {
      try {
        const result = await saveInsight({
          ...form,
          coverImageUrl: form.coverImageUrl || null,
        });
        setSaved(true);
        if (!form.id) {
          router.push(`/admin/insights/${result.id}`);
        }
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Save failed");
      }
    });
  }

  const field =
    "rounded-[12px] border border-[rgba(22,21,15,0.12)] bg-white px-4 py-3 outline-none transition-colors focus:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-8" noValidate>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.8fr)]">
        <div className="flex flex-col gap-6">
          <div className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-6 sm:p-7">
            <label className="flex flex-col gap-2" htmlFor={`${formId}-title`}>
              <span className="text-[13px] font-medium text-smoke">Title</span>
              <input
                id={`${formId}-title`}
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
                placeholder="Insight title"
                className={`${field} text-[20px] font-semibold tracking-[-0.02em]`}
              />
            </label>

            <label
              className="mt-5 flex flex-col gap-2"
              htmlFor={`${formId}-excerpt`}
            >
              <span className="text-[13px] font-medium text-smoke">
                Excerpt
              </span>
              <textarea
                id={`${formId}-excerpt`}
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                required
                rows={3}
                placeholder="One or two sentences for cards and SEO"
                className={`${field} resize-y text-[15px] leading-[1.6]`}
              />
            </label>
          </div>

          <div className="rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-white p-6 sm:p-7">
            <div className="mb-3 text-[13px] font-medium text-smoke">Body</div>
            <RichTextEditor
              value={form.content}
              onChange={(html) => update("content", html)}
            />
          </div>
        </div>

        <aside className="flex h-fit flex-col gap-5 rounded-[20px] border border-[rgba(22,21,15,0.1)] bg-panel-warm p-6 lg:sticky lg:top-6">
          <fieldset className="m-0 flex flex-col gap-4 border-0 p-0">
            <legend className="mb-1 px-0 text-[13px] font-semibold tracking-[-0.01em]">
              Publishing
            </legend>

            <label className="flex flex-col gap-2" htmlFor={`${formId}-slug`}>
              <span className="text-[12.5px] text-smoke">Slug</span>
              <input
                id={`${formId}-slug`}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  update("slug", e.target.value);
                }}
                required
                className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 font-mono text-[13px] outline-none focus:border-ink"
              />
            </label>

            <label className="flex flex-col gap-2" htmlFor={`${formId}-tag`}>
              <span className="text-[12.5px] text-smoke">Tag</span>
              <input
                id={`${formId}-tag`}
                value={form.tag}
                onChange={(e) => update("tag", e.target.value)}
                required
                className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
              />
            </label>

            <label className="flex flex-col gap-2" htmlFor={`${formId}-status`}>
              <span className="text-[12.5px] text-smoke">Status</span>
              <select
                id={`${formId}-status`}
                value={form.status}
                onChange={(e) =>
                  update("status", e.target.value as "draft" | "published")
                }
                className="rounded-[10px] border border-[rgba(22,21,15,0.12)] bg-white px-3 py-2.5 text-[14px] outline-none focus:border-ink"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </label>

            <label className="flex items-center gap-3 text-[14px]">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => update("featured", e.target.checked)}
                className="h-4 w-4 accent-ember"
              />
              Featured on insights index
            </label>
          </fieldset>

          <div className="border-t border-[rgba(22,21,15,0.08)] pt-5">
            <div className="mb-2 text-[12.5px] text-smoke">Cover image</div>
            {form.coverImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={form.coverImageUrl}
                alt=""
                className="mb-3 h-36 w-full rounded-[12px] object-cover"
              />
            ) : (
              <div className="mb-3 flex h-36 items-center justify-center rounded-[12px] border border-dashed border-[rgba(22,21,15,0.2)] bg-white text-[13px] text-smoke">
                No cover yet
              </div>
            )}
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[rgba(22,21,15,0.15)] bg-white px-3.5 py-2 text-[13px] hover:border-ink">
              <span>{uploadingCover ? "Uploading…" : "Upload cover"}</span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                disabled={uploadingCover}
                className="sr-only"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) void onUploadCover(file);
                }}
              />
            </label>
            {form.coverImageUrl ? (
              <button
                type="button"
                onClick={() => update("coverImageUrl", "")}
                className="ml-3 text-[12.5px] text-smoke underline-offset-2 hover:text-ember hover:underline"
              >
                Remove
              </button>
            ) : null}
          </div>

          {error ? (
            <p
              className="m-0 rounded-[10px] bg-[rgba(199,74,38,0.1)] px-3 py-2 text-[13px] text-ember"
              role="alert"
            >
              {error}
            </p>
          ) : null}
          {saved ? (
            <p className="m-0 text-[13px] text-[rgba(22,21,15,0.65)]" role="status">
              Saved
            </p>
          ) : null}

          <button
            type="submit"
            disabled={pending}
            className="button-dark rounded-full px-5 py-3 text-[14.5px] font-medium disabled:opacity-60"
          >
            {pending
              ? "Saving…"
              : form.status === "published"
                ? "Save & publish"
                : "Save draft"}
          </button>

          {form.status === "published" && form.slug ? (
            <a
              href={`/insights/${form.slug}`}
              target="_blank"
              rel="noreferrer"
              className="self-start border-b border-[rgba(22,21,15,0.25)] pb-0.5 text-[13.5px] hover:border-ember"
            >
              View on site →
            </a>
          ) : null}
        </aside>
      </div>
    </form>
  );
}
