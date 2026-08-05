import type { Metadata } from "next";
import Link from "next/link";
import { getContactMessages } from "@/lib/data/admin-queries";

export const metadata: Metadata = {
  title: "Contacts · Admin",
  robots: { index: false, follow: false },
};

const statusLabel: Record<string, string> = {
  new: "New",
  in_progress: "In progress",
  done: "Done",
};

export default async function AdminContactsPage() {
  const contacts = await getContactMessages();

  return (
    <div>
      <h1 className="m-0 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Contacts
      </h1>
      <p className="mt-3 mb-10 max-w-[520px] text-[15px] leading-[1.65] text-[rgba(22,21,15,0.6)]">
        Every contact form submission lands here with full details, status, and
        notes.
      </p>

      {contacts.length === 0 ? (
        <p className="m-0 rounded-[16px] border border-dashed border-[rgba(22,21,15,0.15)] px-6 py-12 text-center text-[14.5px] text-smoke">
          No submissions yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-[16px] border border-[rgba(22,21,15,0.1)] bg-white">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-[rgba(22,21,15,0.08)] text-[12.5px] text-smoke">
                <th className="px-5 py-3.5 font-medium">Name</th>
                <th className="px-5 py-3.5 font-medium">Email</th>
                <th className="px-5 py-3.5 font-medium">Status</th>
                <th className="px-5 py-3.5 font-medium">Received</th>
                <th className="px-5 py-3.5 font-medium">
                  <span className="sr-only">Open</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-[rgba(22,21,15,0.06)] last:border-0"
                >
                  <td className="px-5 py-4 font-medium">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="hover:text-ember"
                    >
                      {contact.name}
                    </Link>
                    {contact.company ? (
                      <div className="mt-0.5 text-[12.5px] font-normal text-smoke">
                        {contact.company}
                      </div>
                    ) : null}
                  </td>
                  <td className="px-5 py-4 text-[rgba(22,21,15,0.7)]">
                    {contact.email}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-[12px] ${
                        contact.status === "new"
                          ? "bg-[rgba(199,74,38,0.12)] text-ember"
                          : contact.status === "in_progress"
                            ? "bg-[rgba(22,21,15,0.08)] text-ink"
                            : "bg-[rgba(22,21,15,0.05)] text-smoke"
                      }`}
                    >
                      {statusLabel[contact.status] ?? contact.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-smoke">
                    {contact.createdAt.toLocaleString()}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      href={`/admin/contacts/${contact.id}`}
                      className="border-b border-[rgba(22,21,15,0.25)] pb-0.5 text-[13px] hover:border-ember"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
