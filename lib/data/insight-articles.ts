/**
 * Full article bodies for the built-in insights, keyed by slug.
 * Plain semantic HTML (h2, h3, p, ul, ol, blockquote, pre, strong, em, a) so it
 * renders with .article-body on the site and stays editable in the admin editor.
 * Each h2 becomes an entry in the article's "On this page" list.
 */
export const insightArticles: Record<string, string> = {
  /* ---------------------------------------------------------------- */
  "why-we-design-the-data-model-before-anything-else": `
<p>Every project we take on starts the same way, and it is rarely what clients expect. Before wireframes, before a design system, before anyone argues about frameworks, we sit down and draw the data model: the things the product knows about, how they relate, and which of those relationships can never be wrong.</p>
<p>It looks like slow work. It is the fastest thing we do.</p>

<h2>Screens change weekly. Data lives for years.</h2>
<p>A screen is an opinion about how to show something. You can redesign it on a Tuesday and ship it on Wednesday. The data underneath is different. Once real customers have created real records, every shape you chose is load-bearing. Renaming a column is a migration. Splitting one table into two is a project. Discovering that an order can belong to two customers, after you assumed it could only ever belong to one, can be a quarter of work.</p>
<p>So we spend our early hours where changes are cheapest: on paper, before anything depends on them.</p>
<blockquote>The order in which you make decisions is the closest thing engineering has to fate.</blockquote>

<h2>What we actually draw</h2>
<p>The first session is a whiteboard and a list of nouns. We ask the client to describe a normal week in the business and write down every thing they mention: customers, invoices, shipments, lessons, payments. Then we work through four questions for each one.</p>
<ol>
  <li><strong>What makes one of these unique?</strong> If two records look identical, are they the same thing? The answer decides your keys and your duplicate handling.</li>
  <li><strong>Who owns it?</strong> A user, a team, a tenant, nobody. Ownership drives permissions, deletion and billing later.</li>
  <li><strong>How does it change over time?</strong> Does an edit overwrite the past, or do you need history? Prices, addresses and statuses almost always need history.</li>
  <li><strong>What can never be true?</strong> A payment without an order. A lesson scheduled in the past. These become constraints in the database, not checks in the UI.</li>
</ol>
<p>By the end we usually have fewer entities than the client expected and far more rules.</p>

<h2>Constraints belong in the database</h2>
<p>Application code is written by many people over many years. The database is the one place every write passes through. If a rule matters, we put it there: foreign keys, unique indexes, check constraints, not-null columns.</p>
<pre><code>create table payments (
  id          uuid primary key,
  order_id    uuid not null references orders(id),
  amount      numeric(12,2) not null check (amount &gt; 0),
  settled_at  timestamptz
);</code></pre>
<p>None of that is clever. All of it saves a support ticket. A bug in a form can no longer create a payment for nothing, because the database refuses.</p>

<h2>Designing for the questions people will ask</h2>
<p>A good model also answers questions nobody has asked yet. Six months after launch, someone will want to know how many customers churned after their second invoice, or which lessons students repeat most. If the model stores events and timestamps honestly, those are queries. If it only stores current state, they are archaeology.</p>
<p>Our rule of thumb: <em>store what happened, derive what is</em>. Keep the facts, compute the summaries, and you can always change your mind about the summaries.</p>

<h2>Where this saves real time</h2>
<ul>
  <li><strong>Design gets easier.</strong> Designers work from real fields and real states, so screens handle empty, partial and error cases from the start.</li>
  <li><strong>Estimates get honest.</strong> Most surprises in a project are hidden relationships. Drawing them first turns surprises into line items.</li>
  <li><strong>Integrations stop hurting.</strong> When the model is explicit, mapping it to a payment provider or a CRM is translation, not guesswork.</li>
</ul>

<h2>What we tell clients</h2>
<p>If you remember one thing from this note, make it this: ask your team to show you the data model before they show you the screens. If they can't, the screens are built on assumptions, and assumptions are the most expensive thing to change later.</p>
`,

  /* ---------------------------------------------------------------- */
  "shipping-ai-features-that-survive-real-users": `
<p>Every AI feature has a great demo. You type the question you designed it for and it gives the answer you hoped for. Then it meets ten thousand people who type things you never imagined, in languages you didn't test, with intentions you didn't plan for.</p>
<p>This is how we build AI features that are still standing a month after launch.</p>

<h2>Start from the failure, not the demo</h2>
<p>Before we write a prompt, we write down how the feature fails. What does a wrong answer cost? Who notices? Can the user recover on their own? A wrong movie recommendation costs nothing. A wrong refund amount costs money and trust.</p>
<p>That list decides the design. Low-cost failures can be fully automatic. High-cost ones get a human in the loop, a confirmation step, or a narrower job.</p>
<blockquote>The demo is the easy part. The product is everything that happens after it.</blockquote>

<h2>Give the model a smaller job</h2>
<p>The most reliable AI features we ship do one specific thing well. "Answer anything about our product" is a research project. "Draft a reply to this support ticket using these three help articles" is a feature.</p>
<ul>
  <li>Narrow inputs: pass only the context the task needs.</li>
  <li>Structured outputs: ask for fields you can validate, not free prose you have to parse.</li>
  <li>Clear refusals: tell the model what to say when it doesn't know, and make that a normal path in the UI.</li>
</ul>

<h2>Evaluate like it's a test suite</h2>
<p>Prompts drift. Models get updated. A change that improves one case quietly breaks five others. So we keep an evaluation set from day one: real examples, the expected behaviour, and a way to score them automatically.</p>
<ol>
  <li>Collect fifty to a few hundred real inputs, including the ugly ones.</li>
  <li>Write down what a good answer must contain and must never contain.</li>
  <li>Run the full set on every prompt or model change, and compare scores before merging.</li>
</ol>
<p>It is not glamorous. It is the difference between "it seemed better" and knowing.</p>

<h2>Design the interface for being wrong</h2>
<p>Users forgive mistakes they can see and fix. They don't forgive confident nonsense. Good AI interfaces show their sources, make editing easy, and never hide the undo button. When the model is unsure, the UI should say so plainly instead of guessing quietly.</p>

<h2>Watch it in production</h2>
<p>Launch is where learning starts. We log inputs and outputs (with consent and with personal data handled properly), sample them every week, and add the surprising ones to the evaluation set. Cost and latency get dashboards too: an answer that takes twelve seconds is a wrong answer for most interfaces.</p>

<h2>The short version</h2>
<ul>
  <li>Decide what failure costs before you decide what success looks like.</li>
  <li>Give the model a narrow job with structured output.</li>
  <li>Keep an evaluation set and run it on every change.</li>
  <li>Build the UI for the times it's wrong.</li>
  <li>Read real traffic every week.</li>
</ul>
`,

  /* ---------------------------------------------------------------- */
  "what-end-to-end-actually-means": `
<p>"End to end" is on almost every studio's homepage, including ours. It has been said so often that it barely means anything. So here is what we mean by it, phase by phase, written as the checklist we hold ourselves to.</p>

<h2>1. Discovery: the problem before the product</h2>
<p>End to end starts before code. In the first weeks we want to understand the business well enough to argue with it.</p>
<ul>
  <li>Who uses this, what do they do today, and what does it cost them?</li>
  <li>What would make this project a success in six months, in numbers?</li>
  <li>What is explicitly out of scope?</li>
</ul>
<p>The output is short: a written problem statement, a first data model and a plan for the smallest version that proves the idea.</p>

<h2>2. Design: real states, not happy paths</h2>
<p>Our designers work from the data model, so every screen is designed with its empty, loading, partial and error states. We prototype the risky flows first and test them with real users while changes are still cheap.</p>

<h2>3. Build: one team, the whole stack</h2>
<p>The people who design the product sit with the people who build it. Front end, back end, infrastructure and AI work happen in one team with one backlog. That is the practical meaning of end to end: no handoffs where context gets lost.</p>
<blockquote>No handoffs where context gets lost. That's the whole idea.</blockquote>

<h2>4. Launch: production is part of the job</h2>
<p>A product isn't finished when it works on a laptop. Before launch we make sure of the boring things:</p>
<ol>
  <li>Monitoring and alerts that reach a person.</li>
  <li>Backups that have actually been restored once.</li>
  <li>Analytics that answer the success questions from discovery.</li>
  <li>Security basics: secrets out of code, least-privilege access, dependency updates.</li>
</ol>

<h2>5. Run: after launch is where the learning is</h2>
<p>We stay on after launch. We watch how the product is really used, fix what hurts, and plan the next version from evidence rather than guesses. Some clients keep us for a few months, some for years. Either way, the hand-over is a documented system, not a zip file.</p>

<h2>Why we hold ourselves to this</h2>
<p>We build and run our own products, Maestro and Cronpay. Every lesson from running them in production goes back into client work. When we say end to end, we mean we know what it is like to be woken up by a product, and we build so that happens rarely.</p>
`,

  /* ---------------------------------------------------------------- */
  "lessons-from-scaling-to-100-enterprise-tenants": `
<p>Multi-tenancy is one of those decisions that is easy to make on day one and very hard to change on day five hundred. These are the lessons we keep coming back to when one platform has to serve many organisations, each with its own users, data and expectations.</p>

<h2>The decisions that held up</h2>

<h3>A tenant id on every row</h3>
<p>Every table that holds customer data carries the tenant it belongs to. Not just the top-level ones: every child row too. It feels redundant until the day you need to export, delete or audit one tenant's data, and the answer is a single <code>where tenant_id = ?</code> instead of a ten-table join.</p>

<h3>Isolation enforced below the application</h3>
<p>Application code forgets things. We enforce tenant isolation in the database with row-level security, so a missed filter in one query returns nothing instead of another customer's data. Defence in depth is cheap compared with a data leak.</p>

<h3>Configuration, not forks</h3>
<p>Enterprise customers always want something slightly different. We say yes through configuration: feature flags, per-tenant settings, custom fields. We say no to per-customer code branches. One codebase, many configurations, is the only shape that stays maintainable.</p>
<blockquote>One codebase, many configurations. Everything else becomes a museum.</blockquote>

<h2>The two we had to unwind</h2>

<h3>Schema per tenant</h3>
<p>Separate schemas per tenant sound clean: strong isolation, easy per-tenant backups. In practice every migration becomes a loop over every schema, a failure halfway through leaves tenants on different versions, and connection pools fill up. We moved to a shared schema with row-level security, and kept physical separation only for the few customers whose contracts require it.</p>

<h3>Synchronous everything</h3>
<p>Early on, imports, exports and report generation ran inside the request. With a handful of tenants that was fine. With many, one large customer running a big import slowed everyone else down. Moving heavy work to queues with per-tenant concurrency limits fixed the noisy-neighbour problem for good.</p>

<h2>Things we now do from the start</h2>
<ul>
  <li>Per-tenant rate limits and job quotas.</li>
  <li>Usage metrics broken down by tenant, so cost and load are visible.</li>
  <li>A tested process for exporting and deleting one tenant completely.</li>
  <li>Audit logs that record who did what, in which tenant, and when.</li>
</ul>

<h2>If you're starting a multi-tenant product</h2>
<p>Pick shared tables with a tenant id and database-level isolation, push heavy work to queues early, and turn customer requests into configuration. Those three decisions cost little at the start and save a great deal later.</p>
`,

  /* ---------------------------------------------------------------- */
  "building-a-voice-agent-that-knows-when-to-shut-up": `
<p>A voice agent can be accurate and still be unbearable. The difference between a good phone call and a bad one is mostly timing: knowing when the other person has finished, when they want to interrupt, and when silence is fine. Those are social rules, and building a voice agent means turning them into engineering.</p>

<h2>Latency is the whole experience</h2>
<p>In text, a two-second delay is fine. On a call it feels like the line dropped. People expect a reply roughly as fast as another person would give one, so the full loop (hearing the caller, understanding them, deciding what to say and starting to speak) has a very small budget.</p>
<ul>
  <li><strong>Stream everything.</strong> Transcribe while the caller is still talking, and start speaking the first sentence while the rest is still being generated.</li>
  <li><strong>Keep the first words short.</strong> A quick "Sure," or "Got it," buys time without sounding like filler.</li>
  <li><strong>Measure the gap, not the average.</strong> The slowest replies are the ones callers remember.</li>
</ul>

<h2>Knowing when someone has finished</h2>
<p>Silence alone is a poor signal. People pause mid-sentence to think, and a fixed silence timer either cuts them off or leaves awkward gaps. Better end-of-turn detection combines several hints: the words so far, whether the sentence sounds complete, intonation, and how long the pause is.</p>
<blockquote>An agent that interrupts is rude. An agent that never stops talking is worse.</blockquote>

<h2>Letting the caller interrupt</h2>
<p>Real people talk over each other all the time, and a caller who says "no, wait" mid-sentence expects to be heard. The agent has to:</p>
<ol>
  <li>Detect the caller's voice while it is speaking itself, without mistaking its own audio for the caller's.</li>
  <li>Stop speaking within a fraction of a second.</li>
  <li>Remember what it had actually said before it stopped, so the conversation history stays truthful.</li>
</ol>
<p>That last point is easy to miss. If the agent believes it said the whole paragraph, it will refer to things the caller never heard.</p>

<h2>Handing off gracefully</h2>
<p>The most important skill of a voice agent is knowing when it shouldn't continue. Angry callers, complex complaints and anything involving money or health should reach a person quickly, with a summary so nobody has to repeat themselves. Every agent we build has a clear, tested path to a human.</p>

<h2>Testing calls, not prompts</h2>
<p>We test voice agents with recorded and simulated calls: background noise, accents, people who mumble, people who change their mind halfway through. A prompt that reads well on screen means little until it has survived a noisy call from a busy street.</p>
`,

  /* ---------------------------------------------------------------- */
  "teaching-systems-thinking-not-syntax": `
<p>Maestro helps people prepare for technical interviews, especially at service companies. You might expect it to start with code. It doesn't. Our curriculum starts with a whiteboard, because the thing interviewers are really testing is rarely syntax.</p>

<h2>Syntax is the easy part to learn</h2>
<p>Any language's syntax can be looked up in seconds. What can't be looked up is how to break a vague problem into parts, choose a structure for the data, and reason about what happens as the input grows. That is systems thinking, and it is what separates candidates who pass from candidates who freeze.</p>
<blockquote>You can search for syntax. You can't search for judgment.</blockquote>

<h2>How a Maestro lesson is built</h2>
<p>Every lesson follows the same shape, so learners spend their energy on the problem rather than the format.</p>
<ol>
  <li><strong>Frame the problem.</strong> Restate it in your own words and list what you know and don't know.</li>
  <li><strong>Draw it.</strong> Sketch the data and how it flows before writing any code.</li>
  <li><strong>Choose and justify.</strong> Pick an approach and explain the trade-off out loud.</li>
  <li><strong>Then code.</strong> Implement it, test it with edge cases and talk through the complexity.</li>
</ol>

<h2>Human grading, on purpose</h2>
<p>Assignments in Maestro are graded by people. Automated tests can tell you whether code runs; they can't tell you whether your explanation would convince an interviewer, or whether you found the right answer by luck. Human feedback catches the reasoning, not just the result.</p>

<h2>Practising under real conditions</h2>
<p>Knowing the material isn't the same as performing on the day. Maestro's mock tests follow each company's real pattern and timing, including a coding round, and finish with a report that explains where time went and what to practise next.</p>

<h2>Learning by building</h2>
<p>For learners in electronics and hardware roles, the Maestro Simulation Lab applies the same idea to circuits. Instead of memorising formulas, you build a circuit in the browser from a library of parts, watch current flow, and measure it with a scope. Seeing a system behave is the fastest way to understand it.</p>

<h2>What this means beyond interviews</h2>
<p>The habits that pass interviews are the habits that make good engineers: understand the problem, draw the system, explain your choices, then build. That is also how we run client projects at Levantate Labs, which is not a coincidence.</p>
`,

  /* ---------------------------------------------------------------- */
  "the-case-for-boring-technology": `
<p>Every product has a limited budget for novelty. Each new framework, database or infrastructure pattern you adopt spends some of it: time to learn, bugs nobody has written about yet, fewer people who can help. Spend that budget where your users can feel it, and use boring, proven tools everywhere else.</p>

<h2>Novelty is a budget</h2>
<p>A new tool is not free just because it is open source. It costs learning time, unknown failure modes and a smaller pool of answers when something breaks at two in the morning. A team can absorb a few of those costs. A team that absorbs many spends its energy on the tools instead of the product.</p>
<blockquote>Spend your novelty where your users can feel it.</blockquote>

<h2>What boring looks like for us</h2>
<ul>
  <li><strong>Postgres</strong> for almost all data. It does relational, JSON, full-text search and queues well enough for most products.</li>
  <li><strong>A mainstream web framework</strong> with a large community and a predictable upgrade path.</li>
  <li><strong>Managed hosting</strong> where it removes work we don't need to own.</li>
  <li><strong>Plain, well-named code</strong> over clever abstractions.</li>
</ul>
<p>None of these will impress anyone at a conference. All of them are well documented, widely understood and easy to hire for.</p>

<h2>Where we do spend novelty</h2>
<p>Being boring underneath is what lets us be ambitious on top. In Cronpay, the interesting work is making a payment across many blockchains feel like one simple checkout. In Maestro, it is running timed mock tests and a circuit simulator in the browser. Those are where users feel the difference, so that is where we take risks.</p>

<h2>A simple test before adding something new</h2>
<ol>
  <li>What problem does it solve that our current tools can't?</li>
  <li>Will users notice the difference?</li>
  <li>Who on the team will own it when it breaks?</li>
  <li>How hard would it be to remove later?</li>
</ol>
<p>If the answers are vague, the boring option wins.</p>

<h2>Boring is a kindness to the future</h2>
<p>Products outlive the people who started them. Choosing well-known tools means the next engineer, maybe on your own team, maybe after a hand-over, can understand the system on day one. That is one of the most useful things you can build for a client.</p>
`,
};

/** The full body for a built-in post, or a single paragraph from its excerpt. */
export function articleFor(slug: string, excerpt: string) {
  return insightArticles[slug]?.trim() ?? `<p>${excerpt}</p>`;
}
