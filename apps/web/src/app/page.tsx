import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { AudienceFork } from "@/components/audience-fork";
import { CopyCommand } from "@/components/copy-command";
import { InstallTabs } from "@/components/install-tabs";
import { InterviewDemo } from "@/components/interview-demo";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { agents, repoUrl, sources } from "@/lib/site";

const AREAS = [
  ["Core", "Who it's for, and what changes for them. One sentence you both agree on."],
  ["The real challenge", "The problem under the request. Usually not the feature you asked for."],
  ["Picture", "A real moment: the first screen, the last time it hurt."],
  ["References", "What already comes close, and where it falls short."],
  ["Edges", "What it must not be. If you say yes to this, what are you saying no to?"],
  ["Success", "How you'll know, within ten seconds, that it's right."],
];

const PROBLEMS = [
  "A feature", "A redesign", "An API", "A data model", "A landing page", "A launch email",
  "A pricing change", "A research question", "A product bet", "A hard decision",
];

const h2 = "font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.01em]";

export default function Home() {
  return (
    <>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-mono text-[13px] font-medium">
          <Logo />
          interview-me
        </Link>
        <nav aria-label="Primary navigation" className="flex items-center gap-1 text-[13px]">
          <a href="#method" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block">Method</a>
          <a href="#sources" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block">Sources</a>
          <a href="#install" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block">Install</a>
          <ThemeToggle />
          <Button asChild variant="outline" size="sm">
            <a href={repoUrl}>GitHub <ArrowUpRight /></a>
          </Button>
        </nav>
      </header>

      <main id="top">
        <section aria-labelledby="hero-heading" className="mx-auto grid max-w-6xl items-start gap-12 px-5 pb-24 pt-8 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-16">
          {/* min-w-0: grid items default to min-width:auto, which lets long commands widen the page. */}
          <div className="min-w-0">
            <AudienceFork
              human={
                <>
                  <h1 id="hero-heading" className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
                    Agents can&rsquo;t read your mind.
                    <br />
                    <em className="text-accent">So let it ask.</em>
                  </h1>
                  <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
                    For the idea you can see but can&rsquo;t quite say. Your agent asks you questions, one at a time, until it
                    can say your idea back and you answer &ldquo;that&rsquo;s right.&rdquo; Then it writes the brief and starts building.
                  </p>
                  <div className="mt-8 max-w-md space-y-3">
                    <CopyCommand command="npx interview-me install" />
                    <p className="pl-1 text-[13px] text-muted-foreground">
                      Works with Claude Code, Codex, Cursor, Copilot, Gemini CLI and {agents.length - 5} more.
                    </p>
                  </div>
                </>
              }
            />
          </div>
          <div className="min-w-0 lg:pt-12">
            <InterviewDemo />
          </div>
        </section>

        <section aria-labelledby="cost-heading" className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <h2 id="cost-heading" className={`${h2} max-w-2xl`}>Building on a guess costs more than asking.</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              <div className="bg-background p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Without</p>
                <ol className="mt-5 space-y-3 text-[15px] text-muted-foreground">
                  <li>You describe it in two sentences.</li>
                  <li>The agent produces 400 lines straight away.</li>
                  <li>It&rsquo;s confident, polished, and not what you meant.</li>
                  <li className="text-foreground">You spend an hour explaining what you should have said at the start.</li>
                </ol>
              </div>
              <div className="bg-background p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">With interview-me</p>
                <ol className="mt-5 space-y-3 text-[15px]">
                  <li>You describe it in two sentences.</li>
                  <li>The agent reads what&rsquo;s there, then asks what it can&rsquo;t know.</li>
                  <li>You answer, mostly with one click, until it says it back right.</li>
                  <li className="font-medium">It builds from a brief you&rsquo;ve confirmed. The first version is the right one.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section id="method" aria-labelledby="method-heading" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-24 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-12 lg:self-start">
              <Badge>The method</Badge>
              <h2 id="method-heading" className={`${h2} mt-5`}>
                Six things it needs to know. <em className="text-muted-foreground">However long that takes.</em>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                It skips what you&rsquo;ve already answered and keeps going until it can say your idea back to you. Say
                &ldquo;just go&rdquo; and it writes the brief with what it has, gaps marked.
              </p>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {AREAS.map(([title, body], i) => (
                <li key={title} className="group grid grid-cols-[3rem_1fr] gap-4 py-6">
                  <span className="font-mono text-[13px] text-muted-foreground transition-colors group-hover:text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-serif text-2xl">{title}</h3>
                    <p className="mt-1 text-[15px] text-muted-foreground">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-8 border-t border-border">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <Badge>The sources</Badge>
            <h2 id="sources-heading" className={`${h2} mt-5 max-w-3xl`}>
              Five books on asking good questions, built into one skill.
            </h2>
            <ol className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
              {sources.map((s, i) => (
                <li key={s.title} className="flex flex-col border-t border-foreground/80 pt-5">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                    {String(i + 1).padStart(2, "0")} · {s.year}
                  </span>
                  <h3 className="mt-2 font-serif text-[1.75rem] italic leading-tight">{s.title}</h3>
                  <p className="text-[13px] text-muted-foreground">{s.author}</p>
                  {s.quote ? (
                    <blockquote className="mt-5 border-l-2 border-accent pl-3 text-[15px] leading-snug">&ldquo;{s.quote}&rdquo;</blockquote>
                  ) : (
                    <p className="mt-5 border-l-2 border-border pl-3 text-[15px] leading-snug text-muted-foreground">{s.idea}</p>
                  )}
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {s.borrowed.map((b) => (
                      <li key={b} className="rounded-full border border-border px-2.5 py-0.5 text-[12px] text-muted-foreground">{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
              <li className="flex flex-col justify-end border-t border-dashed border-border pt-5 text-[14px] text-muted-foreground">
                <p>
                  Full citations, and which quotes are verbatim and which are paraphrased, are in{" "}
                  <a href={`${repoUrl}/blob/main/skills/interview-me/references/sources.md`} className="text-foreground underline underline-offset-4">
                    sources.md
                  </a>
                  .
                </p>
              </li>
            </ol>
          </div>
        </section>

        <section aria-labelledby="problems-heading" className="border-t border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <h2 id="problems-heading" className={`${h2} max-w-2xl`}>Not just code. Anything you can&rsquo;t quite say yet.</h2>
            <ul className="mt-10 flex flex-wrap gap-2">
              {PROBLEMS.map((p) => (
                <li key={p} className="rounded-full border border-border bg-background px-4 py-2 font-serif text-xl italic">{p}</li>
              ))}
            </ul>
            <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Each kind of problem gets its own extra questions on top of the six. No filesystem? It runs in any chat and
              puts the brief in its reply.
            </p>
          </div>
        </section>

        <section id="install" aria-labelledby="install-heading" className="scroll-mt-8 bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 id="install-heading" className={h2}>Install once. Stop guessing.</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-background/70">
                Then, next time an idea is still fuzzy:
              </p>
              <blockquote className="mt-5 max-w-md border-l-2 border-accent pl-4 font-serif text-2xl italic leading-snug">
                &ldquo;I want a new onboarding flow. Use the interview-me skill to understand what I mean.&rdquo;
              </blockquote>
              <ul className="mt-10 flex flex-wrap gap-2" aria-label="Supported agents">
                {agents.map((a) => (
                  <li key={a.id} className="rounded-full border border-background/20 px-3 py-1 text-[13px] text-background/80">{a.name}</li>
                ))}
              </ul>
            </div>
            <InstallTabs />
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>MIT licensed. For people whose ideas are ahead of their words.</span>
        <span className="flex gap-4">
          <Link href="/agents" className="transition-colors hover:text-foreground">For agents</Link>
          <a href={repoUrl} className="transition-colors hover:text-foreground">GitHub</a>
        </span>
      </footer>
    </>
  );
}
