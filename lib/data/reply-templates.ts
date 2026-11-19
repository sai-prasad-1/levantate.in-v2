/**
 * Starting points for replying to an enquiry from the admin.
 * Placeholders: {firstName}, {booking} (Calendly link or a fallback line), {topic}.
 * Every template is editable before sending.
 */
export type ReplyTemplate = {
  id: string;
  label: string;
  subject: string;
  body: string;
};

export const replyTemplates: ReplyTemplate[] = [
  {
    id: "intro-call",
    label: "Book an intro call",
    subject: "Let's talk about {topic}",
    body: `Hi {firstName},

Thanks for getting in touch. We've read your note and it sounds like something we'd like to help with.

The best next step is a short call with the people who would actually build it. We'll ask about your goals, timeline and what's already in place, and you can ask us anything.

{booking}

Talk soon,
The Levantate Labs team`,
  },
  {
    id: "more-detail",
    label: "Ask for more detail",
    subject: "A few questions about {topic}",
    body: `Hi {firstName},

Thanks for reaching out. Before we suggest a next step, it would help to know a little more:

1. What are you building, and who is it for?
2. Is anything already built, or are we starting from scratch?
3. When would you like a first version in people's hands?
4. Is there a budget range you're working within?

Short answers are fine. Just reply to this email.

Thanks,
The Levantate Labs team`,
  },
  {
    id: "not-a-fit",
    label: "Not the right fit",
    subject: "Re: your enquiry",
    body: `Hi {firstName},

Thank you for thinking of us and for taking the time to explain what you need.

We've looked at it carefully, and we don't think we're the right team for this one right now. We'd rather say that early than take on work we can't do well.

If your plans change, or you have another project in mind, we'd be glad to hear from you.

All the best,
The Levantate Labs team`,
  },
  {
    id: "blank",
    label: "Blank",
    subject: "Re: your enquiry",
    body: `Hi {firstName},



The Levantate Labs team`,
  },
];

export function fillTemplate(
  text: string,
  values: { firstName: string; topic: string; bookingUrl?: string | null },
) {
  const booking = values.bookingUrl
    ? `You can pick a time that suits you here: ${values.bookingUrl}`
    : "Reply with two or three times that work for you this week and we'll send an invite.";
  return text
    .replaceAll("{firstName}", values.firstName)
    .replaceAll("{topic}", values.topic)
    .replaceAll("{booking}", booking);
}
