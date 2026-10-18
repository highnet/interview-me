"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Round = { q: string; note?: string; options: string[]; pick: number };

const PROMPT = "I want a weekly digest email for our app. Use the interview-me skill to get what I mean.";

const ROUNDS: Round[] = [
  {
    note: "Read src/emails/ and saw you already send receipts with React Email. I'll reuse that.",
    q: "What's the real challenge here: what do people miss today?",
    options: ["Teammates' work gets buried", "Too many notifications", "Nothing, it's a nudge"],
    pick: 0,
  },
  {
    q: "Name an email you actually look forward to. What do you like about it?",
    options: ["Linear's changelog: short, visual", "Morning Brew: has a voice", "Something else"],
    pick: 0,
  },
  {
    q: "What would make you unsubscribe, even if the content is right?",
    options: ["Sent when nothing happened", "Too long to skim", "Both"],
    pick: 2,
  },
];

const BRIEF = [
  ["Core", "A short Monday email showing what teammates did that you missed."],
  ["Feel", "Like Linear's changelog: scannable, one image, no fluff."],
  ["Must not", "Send on quiet weeks. Run past one screen."],
  ["Assumed", "Sends Monday 9am local time. Opt-out is one click."],
];

type Step = { kind: "q"; i: number } | { kind: "a"; i: number } | { kind: "brief" } | { kind: "yes" } | { kind: "build" };

function timeline(): Step[] {
  return [...ROUNDS.flatMap((_, i) => [{ kind: "q", i } as Step, { kind: "a", i } as Step]), { kind: "brief" }, { kind: "yes" }, { kind: "build" }];
}

export function InterviewDemo() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const steps = timeline();
  const [shown, setShown] = useState(0);
  const [picks, setPicks] = useState<number[]>(ROUNDS.map((r) => r.pick));
  const [touched, setTouched] = useState(false);

  const current = steps[shown - 1];
  const waitingOn = current?.kind === "q" ? current.i : null;

  // Autoplay: questions arrive on their own, answers wait briefly for a click.
  useEffect(() => {
    if (!inView || shown >= steps.length) return;
    const delay = shown === 0 ? 500 : waitingOn !== null ? (touched ? 4200 : 2000) : 900;
    const t = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [inView, shown, steps.length, waitingOn, touched]);

  // Keep the newest message in view inside the transcript (not the page).
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [shown]);

  function choose(round: number, option: number) {
    setTouched(true);
    setPicks((p) => p.map((v, i) => (i === round ? option : v)));
    setShown((s) => s + 1);
  }

  function replay() {
    setPicks(ROUNDS.map((r) => r.pick));
    setTouched(false);
    setShown(0);
  }

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-[0_1px_2px_rgb(0_0_0/0.04),0_12px_40px_-12px_rgb(0_0_0/0.12)]">
      <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <span className={cn("size-1.5 rounded-full", shown < steps.length ? "animate-pulse bg-accent" : "bg-muted-foreground/40")} />
          {shown < steps.length - 2 ? "rec · interviewing" : "building"}
        </div>
        <button
          type="button"
          onClick={replay}
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[12px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="size-3" /> Replay
        </button>
      </div>

      <div ref={scroller} className="ruled h-[460px] space-y-4 overflow-y-auto p-4 sm:p-5" aria-live="polite">
        <Bubble side="user">{PROMPT}</Bubble>

        <AnimatePresence initial={false}>
          {steps.slice(0, shown).map((step) => {
            if (step.kind === "q") {
              const r = ROUNDS[step.i];
              const active = waitingOn === step.i;
              return (
                <Enter key={`q${step.i}`}>
                  <div className="space-y-2.5">
                    {r.note && (
                      <p className="border-l-2 border-accent/60 pl-3 font-mono text-[12px] leading-relaxed text-muted-foreground">
                        {r.note}
                      </p>
                    )}
                    <p className="text-[15px] leading-snug">
                      <span className="mr-2 font-mono text-[11px] text-accent">{step.i + 1}/{ROUNDS.length}</span>
                      {r.q}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {r.options.map((o, oi) => (
                        <button
                          key={o}
                          type="button"
                          disabled={!active}
                          onClick={() => choose(step.i, oi)}
                          className={cn(
                            "rounded-full border px-3 py-1 text-[13px] transition-all duration-200",
                            active
                              ? "border-border hover:-translate-y-px hover:border-accent hover:text-accent"
                              : picks[step.i] === oi
                                ? "border-accent bg-accent-soft text-foreground"
                                : "border-transparent text-muted-foreground/60",
                          )}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  </div>
                </Enter>
              );
            }
            if (step.kind === "a") {
              return (
                <Enter key={`a${step.i}`}>
                  <Bubble side="user">{ROUNDS[step.i].options[picks[step.i]]}</Bubble>
                </Enter>
              );
            }
            if (step.kind === "yes") {
              return (
                <Enter key="yes">
                  <Bubble side="user">That&rsquo;s right.</Bubble>
                </Enter>
              );
            }
            if (step.kind === "build") {
              return (
                <Enter key="build">
                  <p className="font-mono text-[12px] text-muted-foreground">
                    <span className="text-accent">→</span> Brief confirmed. Starting with the Monday email template…
                  </p>
                </Enter>
              );
            }
            return (
              <Enter key="brief">
                <div className="rounded-xl border border-dashed border-accent/50 bg-background p-4">
                  <div className="mb-3 flex items-baseline justify-between">
                    <span className="font-serif text-xl">Brief: weekly digest</span>
                    <span className="font-mono text-[11px] text-muted-foreground">docs/briefs/digest.md</span>
                  </div>
                  <dl className="space-y-2 text-[13.5px]">
                    {BRIEF.map(([k, v]) => (
                      <div key={k} className="grid grid-cols-[76px_1fr] gap-3">
                        <dt className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground pt-0.5">{k}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-4 text-[14px] text-muted-foreground">Does this capture it? Anything wrong, missing, or overstated?</p>
                </div>
              </Enter>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Enter({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Bubble({ side, children }: { side: "user"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", side === "user" && "justify-end")}>
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-foreground px-3.5 py-2 text-[14px] leading-snug text-background">
        {children}
      </p>
    </div>
  );
}
