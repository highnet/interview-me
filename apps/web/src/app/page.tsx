import { AudienceFork } from "@/components/audience-fork";
import { Bookshelf } from "@/components/bookshelf";
import { InstallTabs } from "@/components/install-tabs";
import { InterviewDemo } from "@/components/interview-demo";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agents, repoUrl } from "@/lib/site";

// The six areas every interview covers, shown as the brief they produce.
// Values are the weekly-digest answers from the hero interview.
const BRIEF = [
  { field: "Core", asks: "Who is it for, and what changes for them?", value: "A short Monday email showing teammates what they missed." },
  { field: "The real challenge", asks: "What's the real challenge here for you?", value: "Teammates' work gets buried under notifications." },
  { field: "Picture", asks: "Walk me through the last time this got in your way.", value: "Monday, 9am, coffee. One scroll and you're caught up." },
  { field: "References", asks: "What's the closest thing out there?", value: "A good changelog: short, visual, one image." },
  { field: "Edges", asks: "If you say yes to this, what are you saying no to?", value: "Never sent on quiet weeks. Never longer than one screen." },
  { field: "Success", asks: "How will you know, within ten seconds, that it's right?", value: "People reply to it instead of archiving it." },
];

const OPENERS = [
  "Our pricing page feels wrong and I can't say why. Interview me.",
  "I want onboarding that doesn't feel like onboarding. Use interview-me.",
  "Help me write the launch email. Ask me questions first.",
  "Should we split the monolith? Interview me before you answer.",
];

const h2 = "font-display text-[clamp(2.25rem,4.6vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]";

export default function Home() {
  return (
    <>
      <div className="bg-brand text-brand-foreground">
        <SiteHeader />
        <main id="top" className="mx-auto max-w-4xl px-5 pb-24 pt-8 sm:px-8 lg:pb-32 lg:pt-12">
          <section aria-labelledby="hero-heading">
            <AudienceFork />
          </section>
          <section aria-label="Try the interview" className="mt-16">
            <InterviewDemo />
          </section>
        </main>
      </div>

      <section aria-labelledby="cost-heading" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <h2 id="cost-heading" className={`${h2} max-w-3xl`}>A guess costs more than three&nbsp;questions.</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="text-[15px] font-medium text-muted-foreground">Without</h3>
            <ol className="mt-4 space-y-3 text-[17px] leading-snug text-muted-foreground">
              <li>You describe it in two sentences.</li>
              <li>The agent builds straight away.</li>
              <li>It&rsquo;s confident, polished, and not what you meant.</li>
              <li className="text-foreground">You spend an hour explaining what you could have said up front.</li>
            </ol>
          </div>
          <div>
            <h3 className="text-[15px] font-medium text-brand-text">With interview-me</h3>
            <ol className="mt-4 space-y-3 text-[17px] leading-snug">
              <li>You describe it in two sentences.</li>
              <li>The agent reads what&rsquo;s there, then asks what it can&rsquo;t know.</li>
              <li>You answer, mostly with one click, until it says it back right.</li>
              <li className="font-semibold">It builds from a brief you&rsquo;ve confirmed.</li>
            </ol>
          </div>
        </div>
      </section>

      <section id="method" aria-labelledby="method-heading" className="scroll-mt-4 bg-muted">
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_1.35fr] lg:gap-20 lg:py-32">
          <div className="lg:sticky lg:top-12 lg:self-start">
            <h2 id="method-heading" className={h2}>Every interview ends in a&nbsp;brief.</h2>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
              It covers six things, broad to specific, and skips anything you&rsquo;ve already answered. It stops when it
              can explain your idea to a stranger and you&rsquo;d agree. Say &ldquo;just go&rdquo; and it writes the brief
              with the gaps marked as assumptions.
            </p>
            <p className="mt-4 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
              The highlighted lines are yours. Everything in the brief comes from your answers.
            </p>
          </div>

          <article aria-label="Example brief" className="rounded-2xl bg-card p-6 shadow-[0_10px_30px_-18px_oklch(0.2_0.08_264/0.45)] sm:p-8">
            <header className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border pb-5">
              <h3 className="font-display text-[26px] font-semibold tracking-tight">Brief: weekly digest</h3>
              <span className="font-mono text-[13px] text-muted-foreground">docs/briefs/weekly-digest.md</span>
            </header>
            <dl className="divide-y divide-border">
              {BRIEF.map((b) => (
                <div key={b.field} className="grid gap-1.5 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt>
                    <span className="block text-[15px] font-semibold">{b.field}</span>
                  </dt>
                  <dd className="space-y-2">
                    <p className="text-[14px] text-muted-foreground">
                      <span className="sr-only">The agent asks: </span>
                      {b.asks}
                    </p>
                    <p className="text-[17px] leading-snug">
                      <mark className="box-decoration-clone rounded-[3px] bg-highlight px-1 text-highlight-foreground">{b.value}</mark>
                    </p>
                  </dd>
                </div>
              ))}
            </dl>
            <footer className="flex items-center justify-end gap-3 border-t border-border pt-5">
              <span className="text-[14px] text-muted-foreground">Confirmed</span>
              <span className="rounded-2xl rounded-br-md bg-highlight px-4 py-2 text-[15px] text-highlight-foreground">That&rsquo;s right.</span>
            </footer>
          </article>
        </div>
      </section>

      <section aria-labelledby="any-heading" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 id="any-heading" className={h2}>Not just features. Anything you can&rsquo;t quite say yet.</h2>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
              Designs, APIs, data models, writing, pricing, research, hard decisions. Each kind of problem gets its own
              questions on top of the six. With no filesystem, it works in any chat and puts the brief in its reply.
            </p>
          </div>
          <ul aria-label="Example prompts" className="space-y-3">
            {OPENERS.map((o, i) => (
              <li key={o} className={i % 2 ? "flex justify-end" : "flex justify-start sm:pl-10"}>
                <p className="max-w-[26rem] rounded-2xl rounded-br-md bg-highlight px-4 py-3 text-[16px] leading-snug text-highlight-foreground">{o}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-4 border-t border-border">
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <h2 id="sources-heading" className={`${h2} max-w-3xl`}>Built from five books on asking good&nbsp;questions.</h2>
          <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-muted-foreground">
            Each one changed what the agent asks. Pick a book to see the exact questions it puts into the skill. Quotes are
            only used where we could verify them word for word; full citations are in{" "}
            <a href={`${repoUrl}/blob/main/skills/interview-me/references/sources.md`} className="text-foreground underline decoration-brand-text decoration-2 underline-offset-4">
              sources.md
            </a>
            .
          </p>
          <div className="mt-14">
            <Bookshelf />
          </div>
        </div>
      </section>

      <section id="install" aria-labelledby="install-heading" className="scroll-mt-4 bg-brand text-brand-foreground">
        <div className="mx-auto max-w-3xl px-5 py-24 sm:px-8 lg:py-32">
          <p className="ml-auto w-fit max-w-[30rem] rounded-2xl rounded-br-md bg-highlight px-5 py-3 text-[17px] leading-snug text-highlight-foreground">
            <span className="sr-only">You: </span>
            Next time my idea is fuzzy, interview me first.
          </p>
          <h2 id="install-heading" className={`${h2} mt-6`}>Install it once, and it&rsquo;s there when you need&nbsp;it.</h2>
          <div className="mt-10">
            <InstallTabs />
          </div>
          <p className="mt-12 text-[14px] text-brand-muted">Works with</p>
          <p className="mt-2 max-w-2xl text-[16px] leading-relaxed">
            {agents.map((a, i) => (
              <span key={a.id}>
                <span className="whitespace-nowrap">{a.name}</span>
                {i < agents.length - 1 && <span aria-hidden className="px-2 text-brand-muted"> · </span>}{" "}
              </span>
            ))}
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
