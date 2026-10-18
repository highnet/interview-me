"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, domAnimation, m, useInView, useReducedMotion } from "motion/react";
import { FileSearch, Pause, Play, RotateCcw } from "lucide-react";

import { cn } from "@/lib/utils";

type Round = { q: string; note?: string; options: string[]; pick: number };

const ROUNDS: Round[] = [
  {
    note: "Read src/emails/. You already send receipts with React Email, so I'll build on that.",
    q: "What's the real challenge: what do people miss today?",
    options: ["Teammates' work gets buried", "Too many notifications", "Nothing, it's a nudge"],
    pick: 0,
  },
  {
    q: "Name an email you actually look forward to. What do you like about it?",
    options: ["A changelog: short, visual", "A newsletter with a voice", "Something else"],
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
  ["Feel", "Like a good changelog: scannable, one image, no fluff."],
  ["Must not", "Send on quiet weeks. Run past one screen."],
  ["Assumed", "Sends Monday 9am local time. Opt-out is one click."],
];

type Step = { kind: "q"; i: number } | { kind: "a"; i: number } | { kind: "brief" } | { kind: "yes" } | { kind: "build" };

const STEPS: Step[] = [
  ...ROUNDS.flatMap((_, i): Step[] => [{ kind: "q", i }, { kind: "a", i }]),
  { kind: "brief" },
  { kind: "yes" },
  { kind: "build" },
];

// Answers wait for a click; after this long idle, the demo answers for you.
const IDLE_MS = 6000;

export function InterviewDemo() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  // The first question is there from the start, so the transcript is never an empty block.
  const [shown, setShown] = useState(1);
  const [picks, setPicks] = useState<number[]>(ROUNDS.map((r) => r.pick));
  const [paused, setPaused] = useState(false);

  const current = STEPS[shown - 1];
  const waitingOn = current?.kind === "q" ? current.i : null;
  const done = shown >= STEPS.length;
  const confirmed = shown >= STEPS.length - 1;

  useEffect(() => {
    if (!inView || done || paused) return;
    const delay = waitingOn !== null ? IDLE_MS : current?.kind === "brief" ? 2200 : 900;
    const t = setTimeout(() => setShown((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [inView, shown, done, paused, waitingOn, current]);

  function choose(round: number, option: number) {
    setPicks((p) => p.map((v, i) => (i === round ? option : v)));
    setShown((s) => s + 1);
  }

  function replay() {
    setPicks(ROUNDS.map((r) => r.pick));
    setPaused(false);
    setShown(1);
  }

  const latest = current ? announce(current, picks) : "";

  return (
    <LazyMotion features={domAnimation} strict>
      <figure ref={ref} className="text-brand-foreground">
        <figcaption className="flex items-center justify-between gap-2 border-b border-brand-foreground/15 pb-1">
          <span className="flex items-center gap-2 text-[14px] text-brand-muted">
            <span aria-hidden className={cn("size-2 rounded-full", done ? "bg-highlight" : "bg-[oklch(0.72_0.2_27)]")} />
            {done ? "Building from the brief" : confirmed ? "Brief confirmed" : paused ? "Paused" : "Your turn. Answer as if it were your idea."}
          </span>
          <span className="flex">
            {!done && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Resume demo" : "Pause demo"}
                className="grid size-11 place-items-center rounded-lg text-brand-muted transition-colors hover:bg-brand-deep hover:text-brand-foreground"
              >
                {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
              </button>
            )}
            <button
              type="button"
              onClick={replay}
              className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 py-2 text-[14px] text-brand-muted transition-colors hover:bg-brand-deep hover:text-brand-foreground"
            >
              <RotateCcw className="size-3.5" /> Replay
            </button>
          </span>
        </figcaption>

        <div aria-live="polite" className="sr-only">{latest}</div>

        <ol role="log" aria-live="off" aria-label="Example interview" className="min-h-[34rem] space-y-6 pt-6">

          <AnimatePresence initial={false}>
            {STEPS.slice(0, shown).map((step) => {
              const key = step.kind === "q" || step.kind === "a" ? `${step.kind}${step.i}` : step.kind;
              return (
                <Enter key={key} reduced={!!reduced}>
                  {step.kind === "q" && (
                    <Question
                      round={ROUNDS[step.i]}
                      index={step.i}
                      active={waitingOn === step.i}
                      hint={step.i === 0 && waitingOn === 0}
                      onChoose={(o) => choose(step.i, o)}
                    />
                  )}
                  {step.kind === "a" && <Answer>{ROUNDS[step.i].options[picks[step.i]]}</Answer>}
                  {step.kind === "brief" && <Brief />}
                  {step.kind === "yes" && <Answer>That&rsquo;s right.</Answer>}
                  {step.kind === "build" && (
                    <p className="text-[17px] text-brand-muted">Starting with the Monday email template.</p>
                  )}
                </Enter>
              );
            })}
          </AnimatePresence>
        </ol>
      </figure>
    </LazyMotion>
  );
}

function announce(step: Step, picks: number[]) {
  if (step.kind === "q") return `Question ${step.i + 1}: ${ROUNDS[step.i].q}`;
  if (step.kind === "a") return `You: ${ROUNDS[step.i].options[picks[step.i]]}`;
  if (step.kind === "brief") return "The agent wrote a brief and asks if it captures the idea.";
  if (step.kind === "yes") return "You: That's right.";
  return "Brief confirmed. The agent starts building.";
}

function Question({
  round, index, active, hint, onChoose,
}: { round: Round; index: number; active: boolean; hint: boolean; onChoose: (o: number) => void }) {
  return (
    <div className="space-y-3">
      {round.note && (
        <p className="flex items-start gap-2 text-[14px] leading-snug text-brand-muted">
          <FileSearch aria-hidden className="mt-px size-4 shrink-0" />
          {round.note}
        </p>
      )}
      <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-tight tracking-[-0.01em]">
        <span className="sr-only">Question {index + 1} of {ROUNDS.length}: </span>
        {round.q}
      </p>
      {/* Once answered, the options give way to your reply below, as in a real conversation. */}
      {active && <div className="flex flex-wrap gap-2" role="group" aria-label="Answers">
        {round.options.map((o, oi) => (
          <button
            key={o}
            type="button"
            onClick={() => onChoose(oi)}
            className="min-h-11 rounded-full border border-brand-foreground/40 px-4 py-2 text-[15px] transition-[background-color,border-color,color,transform] duration-200 ease-out-quart hover:-translate-y-px hover:border-highlight hover:bg-highlight hover:text-highlight-foreground active:translate-y-0"
          >
            {o}
          </button>
        ))}
      </div>}
      {hint && <p className="text-[14px] text-brand-muted">Pick one. Nothing happens for a few seconds if you don&rsquo;t.</p>}
    </div>
  );
}

function Brief() {
  return (
    <div className="space-y-3">
      <p className="font-display text-[clamp(1.35rem,2.4vw,1.75rem)] font-medium leading-tight tracking-[-0.01em]">Here&rsquo;s the brief. Does this capture it?</p>
      <div className="max-w-xl rounded-xl bg-card p-5 text-foreground shadow-[0_8px_24px_-12px_oklch(0.15_0.1_264/0.5)]">
        <p className="font-display text-[18px] font-semibold">Weekly digest</p>
        <dl className="mt-3 space-y-2 text-[14px]">
          {BRIEF.map(([k, v]) => (
            <div key={k} className="grid grid-cols-[72px_1fr] gap-3">
              <dt className="text-muted-foreground">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-[12px] text-muted-foreground">docs/briefs/weekly-digest.md</p>
      </div>
    </div>
  );
}

function Enter({ children, reduced }: { children: React.ReactNode; reduced: boolean }) {
  return (
    <m.li
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: reduced ? 0.15 : 0.45, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </m.li>
  );
}

function Answer({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-end">
      <p className="max-w-[85%] rounded-2xl rounded-br-md bg-highlight px-4 py-2.5 text-[16px] leading-snug text-highlight-foreground">
        <span className="sr-only">You: </span>
        {children}
      </p>
    </div>
  );
}
