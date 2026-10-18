"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";

export function CopyCommand({ command, className }: { command: string; className?: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2000);
  }

  return (
    <div className={cn("flex items-center gap-2 rounded-xl bg-card py-1.5 pl-4 pr-1.5 font-mono text-[14px] text-foreground", className)}>
      <span aria-hidden className="select-none text-muted-foreground">$</span>
      {/* Scrolls instead of truncating, so the whole command stays readable on phones. */}
      <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap py-2 [scrollbar-width:none]">{command}</code>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed. Select the command to copy it." : ""}
      </span>
      <button
        type="button"
        onClick={copy}
        aria-label={`Copy ${command}`}
        className="inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-1.5 rounded-lg px-3 py-2 font-sans text-[13px] font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
      >
        {state === "copied" ? <Check className="size-4 text-brand-text" /> : <Copy className="size-4" />}
        <span className="hidden sm:inline">{state === "copied" ? "Copied" : state === "failed" ? "Select it" : "Copy"}</span>
      </button>
    </div>
  );
}
