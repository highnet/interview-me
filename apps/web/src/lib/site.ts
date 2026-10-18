export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://interviewme.at";
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

export type Technique = {
  name: string;
  /** What an agent without the skill tends to ask, when the contrast helps. */
  instead?: string;
  /** What interview-me has it ask. */
  asks: string;
};

export type Source = {
  title: string;
  author: string;
  year: number;
  quote?: string;
  idea: string;
  techniques: Technique[];
};

// Quotes are only the ones verified in skills/interview-me/references/sources.md.
// Example questions follow the weekly-digest interview used in the hero demo.
export const sources: Source[] = [
  {
    title: "The Mom Test",
    author: "Rob Fitzpatrick",
    year: 2013,
    quote: "You want facts and commitments, not compliments.",
    idea: "Ask about what actually happened, not what someone would do.",
    techniques: [
      { name: "Past over future", instead: "Would you read a weekly digest?", asks: "When did you last miss something a teammate shipped?" },
      { name: "Dig under the feature", instead: "Which filters should it have?", asks: "What would filters let you do that you can't do now?" },
      { name: "Don't pitch", asks: "Keeps its own ideas back until the brief is confirmed." },
    ],
  },
  {
    title: "Interviewing Users",
    author: "Steve Portigal",
    year: 2023,
    idea: "Silence is a tool. The follow-up question is where the insight is.",
    techniques: [
      { name: "One question at a time", instead: "Who's it for, how often, and what's in it?", asks: "Who's it for?" },
      { name: "Use their words", asks: "You said work gets \u201cburied\u201d. Buried where?" },
      { name: "Leave room", asks: "Say more about that." },
    ],
  },
  {
    title: "Exploring Requirements",
    author: "Donald Gause & Gerald Weinberg",
    year: 1989,
    idea: "Context-free questions first. Make every ambiguity explicit.",
    techniques: [
      { name: "Context-free questions", asks: "Who is this for, and who is it definitely not for?" },
      { name: "Show both readings", instead: "Okay, I'll make it fast.", asks: "\u201cFast\u201d as in quick to load, or quick to read?" },
      { name: "Question the interview", asks: "Am I asking the right things? What should I be asking?" },
    ],
  },
  {
    title: "The Coaching Habit",
    author: "Michael Bungay Stanier",
    year: 2016,
    quote: "What's the real challenge here for you?",
    idea: "Stay curious a little longer. Rush to advice a little more slowly.",
    techniques: [
      { name: "The real challenge", asks: "What's the real challenge here for you?" },
      { name: "And what else?", asks: "And what else? (Asked again until nothing new comes up.)" },
      { name: "Yes to this, no to what?", asks: "If you say yes to this, what are you saying no to?" },
    ],
  },
  {
    title: "Never Split the Difference",
    author: "Chris Voss",
    year: 2016,
    idea: "You understand someone when they say \u201cthat\u2019s right\u201d, not \u201cyou\u2019re right\u201d.",
    techniques: [
      { name: "Mirroring", asks: "\u2026for the whole team?" },
      { name: "Labeling", asks: "It sounds like quiet weeks matter more than the content." },
      { name: "No-oriented questions", instead: "Should we add a daily option?", asks: "Would it be a mistake to leave daily out of v1?" },
    ],
  },
];
