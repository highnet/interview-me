"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

import { sources } from "@/lib/site";
import { useRovingTabs } from "@/lib/use-roving-tabs";
import { cn } from "@/lib/utils";

// Each spine is drawn like the book it stands for: different height, width and binding.
const SPINES = [
  { h: "h-60 sm:h-72", w: "w-11 sm:w-16", tone: "bg-brand text-brand-foreground" },
  { h: "h-72 sm:h-80", w: "w-12 sm:w-[4.5rem]", tone: "bg-foreground text-background" },
  { h: "h-64 sm:h-[19rem]", w: "w-11 sm:w-14", tone: "bg-highlight text-highlight-foreground" },
  { h: "h-56 sm:h-[17rem]", w: "w-11 sm:w-16", tone: "bg-card text-foreground ring-1 ring-inset ring-border" },
  { h: "h-[17rem] sm:h-[19.5rem]", w: "w-12 sm:w-[4.5rem]", tone: "bg-brand-deep text-brand-foreground" },
];

const IDS = sources.map((s) => s.title);

const surname = (author: string) => author.split(" & ")[0].split(" ").at(-1);

export function Bookshelf() {
  const [active, setActive] = useState(IDS[0]);
  const { tabProps, panelProps, focusTab } = useRovingTabs(IDS, active, setActive);
  const index = IDS.indexOf(active);
  const book = sources[index];
  const next = IDS[(index + 1) % IDS.length];

  return (
    <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-20">
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div role="tablist" aria-label="Books" className="flex items-end gap-1.5 border-b-4 border-foreground sm:gap-2">
          {sources.map((s, i) => {
            const spine = SPINES[i];
            const selected = active === s.title;
            return (
              <button
                key={s.title}
                {...tabProps(s.title, "book")}
                aria-label={`${s.title} by ${s.author}`}
                className={cn(
                  "group relative flex shrink-0 flex-col items-center justify-between rounded-t-md pb-3 pt-4 transition-transform duration-300 ease-out-quart",
                  spine.h, spine.w, spine.tone,
                  selected ? "-translate-y-5" : "hover:-translate-y-2",
                )}
              >
                <span aria-hidden className="rotate-180 whitespace-nowrap font-display text-[15px] font-semibold tracking-tight [writing-mode:vertical-rl] sm:text-[17px]">
                  {s.title}
                </span>
                <span aria-hidden className="hidden text-[11px] font-medium opacity-80 sm:block">{surname(s.author)}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-[14px] text-muted-foreground">
          Book {index + 1} of {IDS.length}. Use the arrow keys or tap a spine.
        </p>
      </div>

      <div {...panelProps("book")} className="max-w-2xl">
        <div key={active} className="motion-safe:animate-[rise_0.45s_var(--ease-out-quart)]">
        <p className="text-[15px] text-muted-foreground">
          {book.author}, {book.year}
        </p>
        <h3 className="mt-1 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-semibold leading-[1.05] tracking-[-0.025em]">{book.title}</h3>
        {book.quote ? (
          <blockquote className="mt-5 text-[20px] leading-snug">
            <span aria-hidden className="font-display text-brand-text">&ldquo;</span>
            {book.quote}
            <span aria-hidden className="font-display text-brand-text">&rdquo;</span>
          </blockquote>
        ) : (
          <p className="mt-5 text-[20px] leading-snug">{book.idea}</p>
        )}

        <h4 className="mt-10 text-[15px] font-medium text-muted-foreground">What the agent does with it</h4>
        <ul className="mt-4 divide-y divide-border border-y border-border">
          {book.techniques.map((t) => (
            <li key={t.name} className="grid gap-2 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <p className="text-[15px] font-semibold">{t.name}</p>
              <div className="space-y-1.5">
                {t.instead && (
                  <p className="text-[15px] text-muted-foreground">
                    <span className="sr-only">Instead of: </span>
                    <s className="decoration-muted-foreground/70">{t.instead}</s>
                  </p>
                )}
                <p className="text-[17px] leading-snug">
                  {t.instead && <span className="sr-only">It asks: </span>}
                  {t.asks}
                </p>
              </div>
            </li>
          ))}
        </ul>

        </div>

        <button
          type="button"
          onClick={() => {
            setActive(next);
            focusTab(next);
          }}
          className="group mt-6 inline-flex min-h-11 items-center gap-2 rounded-full py-2 pr-2 text-[15px] font-medium text-brand-text"
        >
          Next: {next}
          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
