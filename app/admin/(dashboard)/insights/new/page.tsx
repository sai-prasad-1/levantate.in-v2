import type { Metadata } from "next";
import { InsightEditorForm } from "@/components/admin/InsightEditorForm";

export const metadata: Metadata = {
  title: "New insight · Admin",
  robots: { index: false, follow: false },
};

export default function NewInsightPage() {
  return (
    <div>
      <h1 className="mb-8 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        New insight
      </h1>
      <InsightEditorForm />
    </div>
  );
}
