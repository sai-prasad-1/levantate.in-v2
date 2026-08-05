import type { Metadata } from "next";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { getAllSettings } from "@/lib/data/settings";

export const metadata: Metadata = {
  title: "Settings · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminSettingsPage() {
  const settings = await getAllSettings();

  return (
    <div>
      <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Settings
      </h1>
      <p className="mt-3 mb-10 max-w-[520px] text-[15px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
        Custom key–value site settings. The Calendly link powers the booking CTA
        on the contact page.
      </p>
      <SettingsForm settings={settings} />
    </div>
  );
}
