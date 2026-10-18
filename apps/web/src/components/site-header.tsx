import Link from "next/link";

import { ThemeToggle } from "@/components/theme-toggle";
import { repoUrl } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-8">
      <Link href="/" className="flex min-h-11 items-center gap-2.5 font-display text-[19px] font-semibold tracking-tight">
        <Mark />
        interview-me
      </Link>
      <nav aria-label="Primary navigation" className="flex items-center text-[14px]">
        <Link href="/#method" className="hidden min-h-11 items-center rounded-full px-3 py-2 text-brand-muted transition-colors hover:text-brand-foreground md:flex">Method</Link>
        <Link href="/#sources" className="hidden min-h-11 items-center rounded-full px-3 py-2 text-brand-muted transition-colors hover:text-brand-foreground md:flex">Sources</Link>
        <Link href="/#install" className="flex min-h-11 items-center rounded-full px-3 py-2 text-brand-muted transition-colors hover:text-brand-foreground">Install</Link>
        <a href={repoUrl} className="hidden min-h-11 items-center rounded-full px-3 py-2 min-[400px]:flex text-brand-muted transition-colors hover:text-brand-foreground">GitHub</a>
        <ThemeToggle />
      </nav>
    </header>
  );
}

// A speech bubble with a question mark: the agent asking.
function Mark() {
  return (
    <svg aria-hidden viewBox="0 0 28 28" className="size-7">
      <path d="M4 6a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4h-7l-6 5v-5H8a4 4 0 0 1-4-4z" className="fill-highlight" />
      <path d="M11.5 8.6a2.6 2.6 0 1 1 3.4 2.5c-.6.2-.9.7-.9 1.3v.6" fill="none" strokeWidth="2" strokeLinecap="round" className="stroke-highlight-foreground" />
      <circle cx="14" cy="16" r="1.2" className="fill-highlight-foreground" />
    </svg>
  );
}
