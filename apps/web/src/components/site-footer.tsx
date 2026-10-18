import Link from "next/link";

import { repoUrl } from "@/lib/site";

export function SiteFooter() {
  const link = "flex min-h-11 items-center px-2 py-2 transition-colors hover:text-foreground";
  return (
    <footer className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-[14px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span>For people whose ideas are ahead of their words.</span>
      <span className="-mx-2 flex flex-wrap">
        <Link href="/agents" className={link}>For agents</Link>
        <a href="/skill.md" className={link}>skill.md</a>
        <a href={`${repoUrl}/blob/main/LICENSE`} className={link}>MIT license</a>
        <a href={repoUrl} className={link}>GitHub</a>
      </span>
    </footer>
  );
}
