"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CopyCommand } from "@/components/copy-command";

const METHODS = [
  {
    id: "cli",
    label: "CLI",
    steps: [
      { cmd: "npx interview-me install", note: "Run in your project. It finds your agents and asks which to set up." },
      { cmd: "npx interview-me update", note: "Get the latest questions and brief format later." },
    ],
  },
  {
    id: "skills",
    label: "skills.sh",
    steps: [{ cmd: "npx skills add highnet/interview-me", note: "Installs the shared skill for any agent that reads skills." }],
  },
  {
    id: "claude",
    label: "Claude Code",
    steps: [
      { cmd: "/plugin marketplace add highnet/interview-me", note: "Then open /plugin, choose Discover, and install interview-me." },
    ],
  },
];

export function InstallTabs() {
  return (
    <Tabs defaultValue="cli" className="w-full">
      <TabsList aria-label="Install method">
        {METHODS.map((m) => (
          <TabsTrigger key={m.id} value={m.id}>
            {m.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {METHODS.map((m) => (
        <TabsContent key={m.id} value={m.id} className="space-y-4">
          {m.steps.map((s) => (
            <div key={s.cmd} className="space-y-1.5">
              <CopyCommand command={s.cmd} />
              <p className="pl-1 text-[13px] text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </TabsContent>
      ))}
    </Tabs>
  );
}
