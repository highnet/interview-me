import { AudienceFork } from "@/components/audience-fork";
import { Bookshelf } from "@/components/bookshelf";
import { CopyCommand } from "@/components/copy-command";
import { InstallTabs } from "@/components/install-tabs";
import { InterviewDemo } from "@/components/interview-demo";
import { SiteHeader } from "@/components/site-header";
import { agents, repoUrl } from "@/lib/site";

const AREAS = [
  ["Core", "Who it's for, and what changes for them. One sentence you both agree on."],
  ["The real challenge", "The problem under the request, which is often not the feature you asked for."],
  ["Picture", "A real moment: the first screen, or the last time this got in your way."],
  ["References", "What already comes close, and where it falls short."],
  ["Edges", "What it must not be. If you say yes to this, what are you saying no to?"],
  ["Success", "How you'll know, within ten seconds, that it's right."],
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
        <main id="top">
          <section aria-labelledby="hero-heading" className="mx-auto grid max-w-6xl gap-12 px-5 pb-20 pt-10 sm:px-8 lg:grid-cols-[1fr_minmax(0,30rem)] lg:gap-16 lg:pb-28 lg:pt-16">
            <div className="min-w-0 lg:pt-6">
              <AudienceFork
                human={
                  <>
                    <h1 id="hero-heading" className="font-display text-[clamp(2.9rem,6.6vw,5.25rem)] font-semibold leading-[0.95] tracking-[-0.03em]">
                      Agents can&rsquo;t read your&nbsp;mind. <span className="text-highlight">So let it&nbsp;ask.</span>
                    </h1>
                    <p className="mt-7 max-w-[34rem] text-[18px] leading-relaxed text-brand-muted">
                      For the idea you can see but can&rsquo;t quite say. Your agent asks one question at a time until it can
                      say your idea back and you answer &ldquo;that&rsquo;s right.&rdquo; Then it writes the brief and builds.
                    </p>
                    <div className="mt-8 max-w-[34rem]">
                      <CopyCommand command="npx interview-me install" />
                      <p className="mt-3 text-[14px] text-brand-muted">
                        Adds one skill folder for each agent you use. <code className="font-mono text-[13px]">npx interview-me uninstall</code> removes it.
                      </p>
                    </div>
                  </>
                }
              />
            </div>
            <div className="min-w-0">
              <InterviewDemo />
            </div>
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
              <li>The agent writes 400 lines straight away.</li>
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
        <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8 lg:py-32">
          <h2 id="method-heading" className={`${h2} max-w-3xl`}>Six things it needs to know, however long that&nbsp;takes.</h2>
          <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-muted-foreground">
            It works from broad to specific and skips anything you&rsquo;ve already answered. It stops when it can explain
            your idea to a stranger and you&rsquo;d agree. Say &ldquo;just go&rdquo; and it writes the brief with the gaps marked.
          </p>
          <ol className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map(([title, body], i) => (
              <li key={title} className="flex gap-4">
                <span aria-hidden className="font-display text-[40px] font-semibold leading-none text-brand-text">{i + 1}</span>
                <div className="pt-1">
                  <h3 className="text-[18px] font-semibold">{title}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ol>
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
        <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:py-32">
          <div className="min-w-0">
            <h2 id="install-heading" className={h2}>Install it once. Ask for it when the idea is&nbsp;fuzzy.</h2>
            <p className="mt-8 max-w-md rounded-2xl rounded-br-md bg-highlight px-5 py-4 text-[18px] leading-snug text-highlight-foreground">
              I want a new onboarding flow. Use the interview-me skill to understand what I mean.
            </p>
            <p className="mt-10 text-[14px] text-brand-muted">Works with</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[15px]" aria-label="Supported agents">
              {agents.map((a) => <li key={a.id}>{a.name}</li>)}
            </ul>
          </div>
          <div className="min-w-0">
            <InstallTabs />
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[14px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>For people whose ideas are ahead of their words.</span>
        <span className="flex gap-1">
          <a href="/agents" className="flex min-h-11 items-center px-2 py-2 transition-colors hover:text-foreground">For agents</a>
          <a href={`${repoUrl}/blob/main/LICENSE`} className="flex min-h-11 items-center px-2 py-2 transition-colors hover:text-foreground">MIT license</a>
          <a href={repoUrl} className="flex min-h-11 items-center px-2 py-2 transition-colors hover:text-foreground">GitHub</a>
        </span>
      </footer>
    </>
  );
}
