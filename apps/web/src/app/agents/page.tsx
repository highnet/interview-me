import type { Metadata } from "next";
import Link from "next/link";

import { CopyCommand } from "@/components/copy-command";
import { agents } from "@/lib/site";

export const metadata: Metadata = {
  title: "For agents",
  description: "The interview-me contract for AI agents: how to run the interview, where the skill lives, and when to start building.",
};

const RULES = [
  "Read what's in reach first. Never ask what the repo or conversation already answers.",
  "One question per turn. Use the harness's question tool if it has one; otherwise lettered options.",
  "Ask about past specifics, not hypotheticals. Dig under feature requests.",
  "Ask “And what else?” until nothing new comes up.",
  "Play it back every 3–4 questions. Continue until the user says “that’s right.”",
  "Write the brief. Build only after it is confirmed.",
];

export default function AgentsPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16 sm:px-8">
      <Link href="/" className="font-mono text-[13px] text-muted-foreground hover:text-foreground">← interview-me</Link>
      <p className="mt-10 font-mono text-[13px] text-muted-foreground"># interview-me: agent contract</p>
      <h1 className="mt-3 font-serif text-5xl leading-[1]">Ask until it&rsquo;s clear. Then build.</h1>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Fetch the skill</h2>
      <div className="mt-3 space-y-2">
        <CopyCommand command="curl -s https://interviewme.sh/skill.md" />
        <CopyCommand command="npx interview-me install --yes" />
      </div>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Rules</h2>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-[15px]">
        {RULES.map((r) => <li key={r}>{r}</li>)}
      </ol>

      <h2 className="mt-12 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Skill folders</h2>
      <table className="mt-3 w-full text-left text-[14px]">
        <tbody className="divide-y divide-border">
          {agents.map((a) => (
            <tr key={a.id}>
              <td className="py-2 pr-4">{a.name}</td>
              <td className="py-2 font-mono text-[13px] text-muted-foreground">{a.dir}/interview-me</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
