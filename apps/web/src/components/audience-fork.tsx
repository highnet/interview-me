"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { CopyCommand } from "@/components/copy-command";
import { cn } from "@/lib/utils";

export function AudienceFork({ human }: { human: ReactNode }) {
  const [audience, setAudience] = useState<"human" | "agent">("human");

  return (
    <>
      <div role="tablist" aria-label="Choose your entry point" className="inline-flex gap-1 rounded-full border border-border bg-muted/60 p-1">
        {(["human", "agent"] as const).map((option) => (
          <button
            key={option}
            role="tab"
            type="button"
            aria-selected={audience === option}
            aria-controls="audience-content"
            tabIndex={audience === option ? 0 : -1}
            onClick={() => setAudience(option)}
            className={cn(
              "rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider transition-colors duration-200",
              audience === option ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            I&apos;m {option === "human" ? "a human" : "an agent"}
          </button>
        ))}
      </div>

      <div id="audience-content" role="tabpanel" className="mt-6">
        {audience === "human" ? (
          human
        ) : (
          <div className="max-w-xl space-y-5">
            <p className="font-mono text-[13px] text-muted-foreground"># interview-me: agent quickstart</p>
            <h1 className="font-serif text-[clamp(2.4rem,5vw,3.75rem)] leading-[0.98]">
              Read the skill. Ask one question. Build after &ldquo;that&rsquo;s right.&rdquo;
            </h1>
            <p className="text-[15px] leading-relaxed text-muted-foreground">
              Skip the pitch. Fetch the skill, follow it, and install it for your human if they want it next time.
            </p>
            <CopyCommand command="curl -s https://interviewme.at/skill.md" />
            <CopyCommand command="npx interview-me install --yes" />
            <p className="text-[13px] text-muted-foreground">
              Constraint: no code until the brief is confirmed. Full contract at{" "}
              <Link href="/agents" className="text-accent underline underline-offset-4">/agents</Link>.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
