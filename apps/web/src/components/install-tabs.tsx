"use client";

import { useState } from "react";

import { CopyCommand } from "@/components/copy-command";
import { siteUrl } from "@/lib/site";
import { useRovingTabs } from "@/lib/use-roving-tabs";
import { cn } from "@/lib/utils";

const METHODS = [
  {
    id: "cli",
    label: "CLI",
    steps: [
      { cmd: "npx interview-me install", note: "Finds the agents you use and adds an interview-me folder to each one's skills folder. Add --global for every project." },
      { cmd: "npx interview-me uninstall", note: "Removes those folders again. Nothing else is touched." },
    ],
  },
  {
    id: "chat",
    label: "Any chat",
    steps: [{ cmd: `Read ${siteUrl}/skill.md and interview me.`, note: "No install. Paste into ChatGPT, Claude, or any agent that can read the web." }],
  },
  {
    id: "skills",
    label: "skills.sh",
    steps: [{ cmd: "npx skills add highnet/interview-me", note: "The shared skill, for any agent that reads skills folders." }],
  },
  {
    id: "claude",
    label: "Claude Code plugin",
    steps: [{ cmd: "/plugin marketplace add highnet/interview-me", note: "Then open /plugin, choose Discover, and install interview-me." }],
  },
] as const;

type MethodId = (typeof METHODS)[number]["id"];
const IDS = METHODS.map((m) => m.id) as MethodId[];

export function InstallTabs() {
  const [active, setActive] = useState<MethodId>("cli");
  const { tabProps, panelProps } = useRovingTabs(IDS, active, setActive);
  const method = METHODS.find((m) => m.id === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Install method" className="flex flex-wrap gap-1 rounded-2xl bg-brand-deep p-1 sm:inline-flex sm:rounded-full">
        {METHODS.map((m) => (
          <button
            key={m.id}
            {...tabProps(m.id, "install")}
            className={cn(
              "min-h-11 rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200",
              active === m.id ? "bg-brand-foreground text-brand" : "text-brand-muted hover:text-brand-foreground",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div {...panelProps("install")} className="mt-5 space-y-5">
        {method.steps.map((s) => (
          <div key={s.cmd} className="space-y-2">
            <CopyCommand command={s.cmd} />
            <p className="text-[14px] leading-relaxed text-brand-muted">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
