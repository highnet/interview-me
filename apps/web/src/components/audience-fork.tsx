"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";

import { CopyCommand } from "@/components/copy-command";
import { siteUrl } from "@/lib/site";
import { useRovingTabs } from "@/lib/use-roving-tabs";
import { cn } from "@/lib/utils";

const AUDIENCES = ["human", "agent"] as const;
type Audience = (typeof AUDIENCES)[number];

export function AudienceFork({ human }: { human: ReactNode }) {
  const [audience, setAudience] = useState<Audience>("human");
  const { tabProps, panelProps } = useRovingTabs(AUDIENCES, audience, setAudience);

  return (
    <div>
      <div {...panelProps("audience")} className="focus-visible:outline-offset-8">
        {audience === "human" ? (
          human
        ) : (
          <>
            <h1 id="hero-heading" className="font-display text-[clamp(2.6rem,6vw,4.75rem)] font-semibold leading-[1] tracking-[-0.025em]">
              Read the skill. Ask one question at a&nbsp;time. Build after &ldquo;that&rsquo;s&nbsp;right.&rdquo;
            </h1>
            <p className="mt-6 max-w-[36rem] text-[17px] leading-relaxed text-brand-muted">
              Fetch the skill and follow it. If your human wants it next time, install it for them. No code until they
              confirm the brief. The full contract is at{" "}
              <Link href="/agents" className="text-brand-foreground underline decoration-highlight decoration-2 underline-offset-4">
                /agents
              </Link>
              .
            </p>
            <div className="mt-8 max-w-[34rem] space-y-2">
              <CopyCommand command={`curl -s ${siteUrl}/skill.md`} />
              <CopyCommand command="npx interview-me install --yes" />
            </div>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3 text-[14px] text-brand-muted">
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
    </div>
  );
}
