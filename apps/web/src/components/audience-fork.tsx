"use client";

import Link from "next/link";
import { useState } from "react";

import { CopyCommand } from "@/components/copy-command";
import { siteUrl } from "@/lib/site";
import { useRovingTabs } from "@/lib/use-roving-tabs";
import { cn } from "@/lib/utils";

const AUDIENCES = ["human", "agent"] as const;
type Audience = (typeof AUDIENCES)[number];

const h1 = "mt-6 font-display text-[clamp(2.9rem,7vw,5.5rem)] font-semibold leading-[0.95] tracking-[-0.03em]";

// The hero is the first exchange of an interview: the visitor's request, then the agent's reply.
export function AudienceFork() {
  const [audience, setAudience] = useState<Audience>("human");
  const { tabProps, panelProps } = useRovingTabs(AUDIENCES, audience, setAudience);

  return (
    <div>
      <div className="flex items-center gap-3 text-[14px] text-brand-muted">
        <span id="audience-label">Reading as</span>
        <div role="tablist" aria-labelledby="audience-label" className="inline-flex rounded-full bg-brand-deep p-1">
          {AUDIENCES.map((a) => (
            <button
              key={a}
              {...tabProps(a, "audience")}
              className={cn(
                "min-h-11 rounded-full px-4 py-2 font-medium transition-colors duration-200",
                audience === a ? "bg-brand-foreground text-brand" : "text-brand-muted hover:text-brand-foreground",
              )}
            >
              {a === "human" ? "Human" : "Agent"}
            </button>
          ))}
        </div>
      </div>

      {/* Both panels sit in one grid cell, so the cell is always as tall as the taller one and switching never moves the page. */}
      <div {...panelProps("audience")} className="mt-10 grid grid-cols-[minmax(0,1fr)] focus-visible:outline-offset-8">
        <div className={cn("min-w-0 [grid-area:1/1]", audience !== "human" && "invisible")} inert={audience !== "human"}>
          <Said>I want a weekly digest email for our app. You know what I&nbsp;mean.</Said>
          {audience === "human" ? (
            <h1 id="hero-heading" className={h1}>
              I can&rsquo;t read your&nbsp;mind. <span className="text-highlight">So let me&nbsp;ask.</span>
            </h1>
          ) : (
            <p aria-hidden className={h1}>
              I can&rsquo;t read your&nbsp;mind. <span className="text-highlight">So let me&nbsp;ask.</span>
            </p>
          )}
          <p className="mt-7 max-w-[38rem] text-[18px] leading-relaxed text-brand-muted">
            interview-me is a skill for your coding agent. It asks one question at a time until it can say your idea
            back and you answer &ldquo;that&rsquo;s right.&rdquo; Then it writes the brief and builds.
          </p>
          <div className="mt-8 max-w-[34rem]">
            <CopyCommand command="npx interview-me install" />
            <p className="mt-3 text-[14px] text-brand-muted">
              Adds one skill folder for each agent you use. <code className="font-mono text-[13px]">npx interview-me uninstall</code> removes it.
            </p>
          </div>
        </div>

        <div className={cn("min-w-0 [grid-area:1/1]", audience !== "agent" && "invisible")} inert={audience !== "agent"}>
          <Said>Use the interview-me skill to understand what I&nbsp;mean.</Said>
          {audience === "agent" ? (
            <h1 id="hero-heading" className={h1}>
              Ask first. <span className="text-highlight">Build after &ldquo;that&rsquo;s&nbsp;right.&rdquo;</span>
            </h1>
          ) : (
            <p aria-hidden className={h1}>
              Ask first. <span className="text-highlight">Build after &ldquo;that&rsquo;s&nbsp;right.&rdquo;</span>
            </p>
          )}
          <p className="mt-7 max-w-[38rem] text-[18px] leading-relaxed text-brand-muted">
            Fetch the skill and follow it: one question per turn, play it back, write the brief, and write no code until
            your human confirms it. The full contract is at{" "}
            <Link href="/agents" className="text-brand-foreground underline decoration-highlight decoration-2 underline-offset-4">/agents</Link>.
          </p>
          <div className="mt-8 max-w-[34rem] space-y-2">
            <CopyCommand command={`curl -s ${siteUrl}/skill.md`} />
            <CopyCommand command="npx interview-me install --yes" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Said({ children }: { children: React.ReactNode }) {
  return (
    <p className="ml-auto w-fit max-w-[30rem] rounded-2xl rounded-br-md bg-highlight px-5 py-3 text-[17px] leading-snug text-highlight-foreground">
      <span className="sr-only">You: </span>
      {children}
    </p>
  );
}
