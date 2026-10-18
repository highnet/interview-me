import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyCommand } from "@/components/copy-command";
import { InterviewDemo } from "@/components/interview-demo";
import { InstallTabs } from "@/components/install-tabs";

const REPO = "https://github.com/highnet/interview-me";

const STAGES = [
  ["Core", "Who it's for, and what changes for them. One sentence you both agree on."],
  ["Picture", "A real moment: the first screen, the first ten seconds."],
  ["References", "What already comes close, and where it falls short."],
  ["Edges", "What it must not be. Rejections are sharper than wishes."],
  ["Constraints", "What's already decided and can't move."],
  ["Success", "How you'll know, within ten seconds, that it's right."],
];

const RULES = [
  ["Reads the repo first", "It never asks what your code already answers. It tells you what it found so you can correct it."],
  ["One to three questions a round", "Never a wall of questions. Options to pick from, with its best guess first."],
  ["Examples over adjectives", "\"Clean\" means nothing until it's tied to something real you can point at."],
  ["Plays it back", "Every few rounds it sums up what it heard and asks what's wrong."],
  ["Names the tensions", "If two answers clash, it asks you to pick instead of settling it quietly."],
  ["Writes nothing but the brief", "No code until you've confirmed the brief."],
];

const AGENTS = ["Claude Code", "Codex", "Cursor", "GitHub Copilot", "Gemini CLI", "OpenCode"];

export default function Home() {
  return (
    <div className="relative">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
        <a href="#" className="flex items-center gap-2 font-mono text-[13px] font-medium">
          <span className="grid size-6 place-items-center rounded-full bg-accent font-serif text-[15px] italic text-accent-foreground">?</span>
          interview-me
        </a>
        <nav className="flex items-center gap-1 text-[13px]">
          <a href="#how" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block">How it works</a>
          <a href="#install" className="hidden rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground sm:block">Install</a>
          <Button asChild variant="outline" size="sm">
            <a href={REPO}>GitHub <ArrowUpRight /></a>
          </Button>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 pb-24 pt-10 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:pt-20">
          <div>
            <Badge>An agent skill · v0.1</Badge>
            <h1 className="mt-6 font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.95] tracking-[-0.02em]">
              Agents can&rsquo;t read your mind.
              <br />
              <em className="text-accent">So let it ask.</em>
            </h1>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-muted-foreground">
              When you have an idea you can&rsquo;t quite put into words, interview-me has your agent ask you questions,
              a few at a time, until it understands what you mean. Then it writes a brief you can sign off before any code gets written.
            </p>
            <div className="mt-8 max-w-md space-y-3">
              <CopyCommand command="npx interview-me install" />
              <p className="pl-1 text-[13px] text-muted-foreground">
                Works with {AGENTS.slice(0, 3).join(", ")} and more.
              </p>
            </div>
          </div>
          <InterviewDemo />
        </section>

        {/* Before / after */}
        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <h2 className="max-w-2xl font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.01em]">
              Building on a guess costs more than three questions.
            </h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
              <div className="bg-background p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Without</p>
                <ol className="mt-5 space-y-3 text-[15px] text-muted-foreground">
                  <li>You describe the feature in two sentences.</li>
                  <li>The agent writes 400 lines straight away.</li>
                  <li>It&rsquo;s confident, polished, and not what you meant.</li>
                  <li className="text-foreground">You spend an hour explaining what you should have said at the start.</li>
                </ol>
              </div>
              <div className="bg-background p-6 sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-wider text-accent">With interview-me</p>
                <ol className="mt-5 space-y-3 text-[15px]">
                  <li>You describe the feature in two sentences.</li>
                  <li>The agent reads your code, then asks you three sharp questions.</li>
                  <li>You pick answers, mostly with one click.</li>
                  <li className="font-medium">You sign off a one-page brief, and the first build is the right one.</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* How */}
        <section id="how" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-24 sm:px-8">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.4fr]">
            <div className="lg:sticky lg:top-12 lg:self-start">
              <Badge>How it works</Badge>
              <h2 className="mt-5 font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02] tracking-[-0.01em]">
                Six things it needs to know. <em className="text-muted-foreground">Usually 3 to 6 rounds.</em>
              </h2>
              <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
                It skips anything you&rsquo;ve already answered and stops when it could explain your idea to a stranger and you&rsquo;d agree.
                Say &ldquo;just go&rdquo; and it writes the brief with what it has.
              </p>
            </div>
            <ol className="divide-y divide-border border-y border-border">
              {STAGES.map(([title, body], i) => (
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

          <div className="mt-24 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {RULES.map(([title, body]) => (
              <div key={title} className="border-t border-foreground/80 pt-4">
                <h3 className="text-[15px] font-medium">{title}</h3>
                <p className="mt-1.5 text-[14px] leading-relaxed text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Install */}
        <section id="install" className="scroll-mt-8 border-t border-border bg-foreground text-background">
          <div className="mx-auto grid max-w-6xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-2">
            <div>
              <h2 className="font-serif text-[clamp(2.2rem,4.5vw,3.5rem)] leading-[1.02]">Install it in one line.</h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-background/70">
                Then, next time an idea is still fuzzy, ask your agent to use it:
              </p>
              <blockquote className="mt-5 max-w-md border-l-2 border-accent pl-4 font-serif text-2xl italic leading-snug">
                &ldquo;I want a new onboarding flow. Use the interview-me skill to understand what I mean.&rdquo;
              </blockquote>
              <div className="mt-10 flex flex-wrap gap-2">
                {AGENTS.map((a) => (
                  <span key={a} className="rounded-full border border-background/20 px-3 py-1 text-[13px] text-background/80">{a}</span>
                ))}
              </div>
            </div>
            <div className="text-foreground [&_[role=tablist]]:border-background/15 [&_[role=tablist]]:bg-background/10 [&_[role=tab]]:text-background/60 [&_[role=tab][data-state=active]]:text-foreground [&_p]:text-background/60">
              <InstallTabs />
            </div>
          </div>
        </section>
      </main>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-10 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span>MIT licensed. Made for people whose ideas are ahead of their words.</span>
        <a href={REPO} className="transition-colors hover:text-foreground">github.com/highnet/interview-me</a>
      </footer>
    </div>
  );
}
