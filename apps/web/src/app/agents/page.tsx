import type { Metadata } from "next";

import { CopyCommand } from "@/components/copy-command";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { agents, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "For agents",
  description: "The interview-me contract for AI agents: how to run the interview, where the skill lives, and when to start building.",
};

const RULES = [
  "Read what's in reach first. Never ask what the repo or conversation already answers.",
  "Ask one question per turn. Use the harness's question tool if it has one; otherwise give lettered options.",
  "Ask about past specifics, not hypotheticals. Dig under feature requests.",
  "Ask “And what else?” until nothing new comes up.",
  "Play it back every 3–4 questions, until the user says “that’s right.”",
  "Write the brief. Build only after it is confirmed.",
];

export default function AgentsPage() {
  return (
    <>
      <div className="bg-brand text-brand-foreground">
        <SiteHeader />
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1] tracking-[-0.025em]">
            Ask until it&rsquo;s clear. Then&nbsp;build.
          </h1>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-brand-muted">
            The contract for agents. Fetch the skill, follow it, and install it for your human if they want it next time.
            Read it in full at{" "}
            <a href="/skill.md" className="text-brand-foreground underline decoration-highlight decoration-2 underline-offset-4">/skill.md</a>.
          </p>
          <div className="mt-8 space-y-2">
            <CopyCommand command={`curl -s ${siteUrl}/skill.md`} />
            <CopyCommand command="npx interview-me install --yes" />
          </div>
          <p className="mt-3 text-[14px] text-brand-muted">
            <code className="font-mono text-[13px]">--yes</code> installs for every agent found in the project, without asking.
          </p>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-5 py-16 sm:px-8">
        <h2 className="font-display text-[28px] font-semibold tracking-tight">Rules</h2>
        <ol className="mt-5 space-y-3 text-[17px] leading-snug">
          {RULES.map((r, i) => (
            <li key={r} className="flex gap-4">
              <span aria-hidden className="w-5 shrink-0 font-display font-semibold text-brand-text">{i + 1}</span>
              <span>{r}</span>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 font-display text-[28px] font-semibold tracking-tight">Skill folders</h2>
        <table className="mt-5 w-full text-left text-[15px]">
          <caption className="sr-only">Where the skill is installed for each agent</caption>
          <thead className="text-[14px] text-muted-foreground">
            <tr>
              <th scope="col" className="pb-2 pr-6 font-medium">Agent</th>
              <th scope="col" className="pb-2 font-medium">Project folder</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border border-t border-border">
            {agents.map((a) => (
              <tr key={a.id}>
                <td className="py-3 pr-6">{a.name}</td>
                <td className="break-all py-3 font-mono text-[13px] text-muted-foreground">{a.dir}/interview-me</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      <SiteFooter />
    </>
  );
}
