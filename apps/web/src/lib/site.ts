export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://interviewskill.me";
export const repoUrl = "https://github.com/highnet/interview-me";

// Mirrors packages/cli/src/agents.js (which mirrors highnet/variantly).
export const agents = [
  { id: "claude", name: "Claude Code", dir: ".claude/skills" },
  { id: "codex", name: "Codex CLI", dir: ".agents/skills" },
  { id: "cursor", name: "Cursor", dir: ".cursor/skills" },
  { id: "copilot", name: "GitHub Copilot", dir: ".github/skills" },
  { id: "gemini", name: "Gemini CLI", dir: ".gemini/skills" },
  { id: "opencode", name: "OpenCode", dir: ".opencode/skills" },
  { id: "grok", name: "Grok Build", dir: ".grok/skills" },
  { id: "hermes", name: "Hermes Agent", dir: ".hermes/skills" },
  { id: "pi", name: "Pi", dir: ".pi/skills" },
  { id: "antigravity", name: "Antigravity", dir: ".agents/skills" },
] as const;

export type Source = {
  title: string;
  author: string;
  year: number;
  quote?: string;
  idea: string;
  borrowed: string[];
};

// Quotes are only the ones verified in skills/interview-me/references/sources.md.
export const sources: Source[] = [
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    year: 2013,
    quote: "You want facts and commitments, not compliments.",
    idea: "Ask about what actually happened, not what someone would do.",
    borrowed: ["Past over future", "Dig under the feature", "Don't pitch"],
  },
  {
    title: "Interviewing Users",
    author: "Steve Portigal",
    year: 2023,
    idea: "Silence is a tool. Follow-ups are where the insight lives.",
    borrowed: ["One question at a time", "Use their words", "Say more about that"],
  },
  {
    title: "Exploring Requirements",
    author: "Donald Gause & Gerald Weinberg",
    year: 1989,
    idea: "Context-free questions first. Make every ambiguity explicit.",
    borrowed: ["Context-free questions", "Show both readings", "Questions about the interview"],
  },
  {
    title: "The Coaching Habit",
    author: "Michael Bungay Stanier",
    year: 2016,
    quote: "What's the real challenge here for you?",
    idea: "Stay curious a little longer. Rush to advice a little more slowly.",
    borrowed: ["And what else?", "The real challenge", "Yes to this, no to what?"],
  },
  {
    title: "Never Split the Difference",
    author: "Chris Voss",
    year: 2016,
    idea: "You understand someone when they say “that’s right”, not “you’re right”.",
    borrowed: ["Mirroring", "Labeling", "No-oriented questions"],
  },
];
