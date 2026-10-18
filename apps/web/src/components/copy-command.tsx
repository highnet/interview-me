"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be blocked; the command stays selectable.
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border bg-card py-2 pl-4 pr-2 font-mono text-[13.5px]",
        className,
      )}
    >
      <span aria-hidden className="select-none text-accent">$</span>
      <code className="min-w-0 flex-1 truncate">{command}</code>
      <button
        type="button"
        onClick={copy}
        aria-label={copied ? "Copied" : `Copy ${command}`}
        className="grid size-8 shrink-0 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <span className="relative size-4">
          <Copy className={cn("absolute inset-0 size-4 transition-all duration-200", copied && "scale-50 opacity-0")} />
          <Check className={cn("absolute inset-0 size-4 text-accent transition-all duration-200", !copied && "scale-50 opacity-0")} />
        </span>
      </button>
    </div>
  );
}
