/**
 * Facts about Levantate Labs' own products, shared by structured data and llms.txt.
 * Keep in step with the products page (components/home/Products.tsx, app/products).
 */
export type ProductFact = {
  id: string;
  name: string;
  status: string;
  url?: string;
  category: "EducationalApplication" | "FinanceApplication" | "BusinessApplication";
  summary: string;
  points: readonly string[];
  /** Name of the product this one is part of. */
  partOf?: string;
};

export const productFacts: readonly ProductFact[] = [
  {
    id: "maestro",
    name: "Maestro",
    status: "Live",
    url: "https://studywithmaestro.com/",
    category: "EducationalApplication",
    summary:
      "Interview prep that works like the real round: human-graded courses for service-company interviews, and timed mock tests in each company's real pattern.",
    points: [
      "Short lessons, real assignments, graded by humans",
      "Company-pattern mock tests with a real coding round",
      "Exam-day conditions and a report that coaches you",
    ],
  },
  {
    id: "maestro-simulation-lab",
    name: "Maestro Simulation Lab",
    status: "Live, available to Maestro learners",
    category: "EducationalApplication",
    partOf: "Maestro",
    summary:
      "A circuit simulator in the browser. Build from 167 parts, from resistors to an Arduino Uno, and watch current flow live, with a scope and Bode plots.",
    points: ["Runs in the browser", "167 parts, from resistors to an Arduino Uno", "Live current flow, scope and Bode plots"],
  },
  {
    id: "cronpay",
    name: "Cronpay",
    status: "Early access",
    url: "https://cronpay.xyz/",
    category: "FinanceApplication",
    summary:
      "Permissionless crypto checkout. Customers pay with the token they already hold, on the chain they already use; the merchant settles in the token and chain they want.",
    points: [
      "58 chains, one locked price for the customer",
      "1% per settled payment, no monthly fees",
      "Honest status, from detected to settled",
    ],
  },
  {
    id: "elevox",
    name: "Elevox",
    status: "In development",
    category: "BusinessApplication",
    summary:
      "An AI phone agent that answers every call in the customer's language, books appointments, qualifies leads and hands off to the team when it matters.",
    points: ["Answers calls in the caller's language", "Books appointments and qualifies leads", "Hands off to a person when it matters"],
  },
];
