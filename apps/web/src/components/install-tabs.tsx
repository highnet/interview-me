"use client";

import { useState } from "react";

import { CopyCommand } from "@/components/copy-command";
import { cn } from "@/lib/utils";

const METHODS = [
  {
    id: "cli",
    label: "CLI",
    steps: [
      { cmd: "npx interview-me install", note: "Finds the agents you use and installs to each one. Add --global for every project." },
      { cmd: "npx interview-me update", note: "Pull the latest questions and brief format later." },
    ],
  },
  {
    id: "skills",
    label: "skills.sh",
    steps: [{ cmd: "npx skills add highnet/interview-me", note: "The shared skill, for any agent that reads skills folders." }],
  },
  {
    id: "claude",
    label: "Claude Code",
    steps: [{ cmd: "/plugin marketplace add highnet/interview-me", note: "Then /plugin → Discover → interview-me." }],
  },
  {
    id: "chat",
    label: "Any chat",
    steps: [{ cmd: "Read https://interviewme.sh/skill.md and interview me.", note: "No install. Paste into ChatGPT, Claude.ai, or any agent with web access." }],
  },
];

export function InstallTabs() {
  const [active, setActive] = useState(METHODS[0].id);
  const method = METHODS.find((m) => m.id === active)!;

  return (
    <div>
      <div role="tablist" aria-label="Install method" className="inline-flex flex-wrap gap-1 rounded-full border border-background/15 bg-background/10 p-1">
        {METHODS.map((m) => (
          <button
            key={m.id}
            role="tab"
            type="button"
            aria-selected={active === m.id}
            aria-controls="install-panel"
            onClick={() => setActive(m.id)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              active === m.id ? "bg-background text-foreground shadow-sm" : "text-background/60 hover:text-background",
            )}
          >
            {m.label}
          </button>
        ))}
      </div>
      <div id="install-panel" role="tabpanel" className="mt-4 space-y-4 text-foreground">
        {method.steps.map((s) => (
          <div key={s.cmd} className="space-y-1.5">
            <CopyCommand command={s.cmd} />
            <p className="pl-1 text-[13px] text-background/60">{s.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
