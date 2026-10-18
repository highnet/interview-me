"use client";

import { useState } from "react";

import { sources } from "@/lib/site";
import { useRovingTabs } from "@/lib/use-roving-tabs";
import { cn } from "@/lib/utils";

// Each spine is drawn like the book it stands for: different height, width and binding.
const SPINES = [
  { h: "h-60", w: "w-11 sm:w-14", tone: "bg-brand text-brand-foreground" },
  { h: "h-72", w: "w-12 sm:w-16", tone: "bg-foreground text-background" },
  { h: "h-64", w: "w-10 sm:w-12", tone: "bg-highlight text-highlight-foreground" },
  { h: "h-56", w: "w-11 sm:w-14", tone: "bg-card text-foreground ring-1 ring-inset ring-border" },
  { h: "h-[17rem]", w: "w-12 sm:w-16", tone: "bg-brand-deep text-brand-foreground" },
];

const IDS = sources.map((s) => s.title);

export function Bookshelf() {
  const [active, setActive] = useState(IDS[0]);
  const { tabProps, panelProps } = useRovingTabs(IDS, active, setActive);
  const book = sources.find((s) => s.title === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
      <div role="tablist" aria-label="Books" className="flex items-end gap-1.5 border-b-4 border-foreground pb-0 sm:gap-2">
        {sources.map((s, i) => {
          const spine = SPINES[i];
          const selected = active === s.title;
          return (
            <button
              key={s.title}
              {...tabProps(s.title, "book")}
              aria-label={`${s.title} by ${s.author}`}
              className={cn(
                "relative flex shrink-0 items-center justify-center rounded-t-md transition-transform duration-300 ease-out-quart",
                spine.h, spine.w, spine.tone,
                selected ? "-translate-y-4" : "hover:-translate-y-2",
              )}
            >
              <span aria-hidden className="font-display text-[15px] font-semibold tracking-tight [writing-mode:vertical-rl] rotate-180 whitespace-nowrap">
                {s.title}
              </span>
            </button>
          );
        })}
      </div>

      <div {...panelProps("book")} className="max-w-xl lg:pb-2">
        <p className="text-[15px] text-muted-foreground">
          {book.author}, {book.year}
        </p>
        <h3 className="mt-1 font-display text-[clamp(1.75rem,3vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">{book.title}</h3>
        {book.quote ? (
          <blockquote className="mt-5 text-[19px] leading-snug">
            <span aria-hidden className="mr-0.5 font-display text-brand-text">&ldquo;</span>
            {book.quote}
            <span aria-hidden className="font-display text-brand-text">&rdquo;</span>
          </blockquote>
        ) : (
          <p className="mt-5 text-[19px] leading-snug">{book.idea}</p>
        )}
        <p className="mt-6 text-[14px] text-muted-foreground">What the skill takes from it</p>
        <ul className="mt-2 flex flex-wrap gap-2">
          {book.borrowed.map((b) => (
            <li key={b} className="rounded-full bg-muted px-3 py-1.5 text-[14px]">{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
