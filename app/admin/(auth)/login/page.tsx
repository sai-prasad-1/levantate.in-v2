import type { Metadata } from "next";
import { AdminProviders } from "@/components/admin/AdminProviders";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ sent?: string; error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-bone px-5 py-16">
      <div className="w-full max-w-[440px]">
        <AdminProviders>
          <AdminLoginForm sent={params.sent === "1"} />
        </AdminProviders>
        {params.error ? (
          <p className="mt-4 text-center text-[13px] text-ember">
            That sign-in link is invalid or expired. Request a new one.
          </p>
        ) : null}
      </div>
    </div>
  );
}
