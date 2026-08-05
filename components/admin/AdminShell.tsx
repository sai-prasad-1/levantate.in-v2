import Link from "next/link";
import { auth, signOut } from "@/auth";
import { AdminNav } from "@/components/admin/AdminNav";

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <div className="min-h-screen bg-bone text-ink">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[200] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-bone"
      >
        Skip to admin content
      </a>

      <header className="border-b border-[rgba(22,21,15,0.1)] bg-[rgba(247,245,240,0.96)] backdrop-blur-[12px]">
        <div className="mx-auto flex max-w-site flex-col gap-5 px-5 py-5 sm:px-8">
          <div className="flex items-center justify-between gap-6">
            <Link
              href="/admin"
              className="inline-flex items-center gap-2.5 text-[15px] font-semibold tracking-[-0.02em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              <span
                className="inline-block h-2.5 w-2.5 shrink-0 bg-ember"
                aria-hidden
              />
              Admin
            </Link>
            <div className="flex items-center gap-5 text-[14px]">
              <span className="hidden text-[rgba(22,21,15,0.55)] sm:inline">
                {session?.user?.email}
              </span>
              <Link
                href="/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-ink underline decoration-[rgba(22,21,15,0.3)] underline-offset-4 hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                View site
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/admin/login" });
                }}
              >
                <button
                  type="submit"
                  className="cursor-pointer border-0 bg-transparent p-0 font-medium text-ink underline decoration-[rgba(22,21,15,0.3)] underline-offset-4 hover:decoration-ember focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>

          <AdminNav />
        </div>
      </header>

      <main
        id="admin-main"
        tabIndex={-1}
        className="mx-auto max-w-site px-5 py-10 outline-none sm:px-8 sm:py-12"
      >
        {children}
      </main>
    </div>
  );
}
