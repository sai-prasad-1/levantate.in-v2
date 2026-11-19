import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactDetailPanel } from "@/components/admin/ContactDetailPanel";
import { ReplyComposer } from "@/components/admin/ReplyComposer";
import { getContactMessageById, getContactReplies } from "@/lib/data/admin-queries";
import { getCalendlyUrl } from "@/lib/data/settings";
import { isEmailConfigured } from "@/lib/mail/send";

type PageProps = {
  params: Promise<{ id: string }>;
};

export const metadata: Metadata = {
  title: "Contact · Admin",
  robots: { index: false, follow: false },
};

export default async function AdminContactDetailPage({ params }: PageProps) {
  const { id } = await params;
  const contact = await getContactMessageById(id);
  if (!contact) notFound();

  const [replies, bookingUrl] = await Promise.all([getContactReplies(contact.id), getCalendlyUrl()]);

  return (
    <div>
      <h1 className="mb-8 text-[clamp(32px,4vw,44px)] font-semibold tracking-[-0.03em]">
        Submission
      </h1>
      <ContactDetailPanel
        contact={{
          id: contact.id,
          name: contact.name,
          email: contact.email,
          company: contact.company,
          needs: contact.needs ?? [],
          message: contact.message,
          status: contact.status,
          adminNotes: contact.adminNotes,
          createdAt: contact.createdAt.toISOString(),
          emailedAt: contact.emailedAt?.toISOString() ?? null,
        }}
      />
      <ReplyComposer
        contactId={contact.id}
        name={contact.name}
        email={contact.email}
        needs={contact.needs ?? []}
        bookingUrl={bookingUrl || null}
        emailReady={isEmailConfigured()}
        replies={replies.map((r) => ({
          id: r.id,
          subject: r.subject,
          body: r.body,
          sentAt: r.sentAt.toISOString(),
          sentByEmail: r.sentByEmail,
        }))}
      />
    </div>
  );
}
