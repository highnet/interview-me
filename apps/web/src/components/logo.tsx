import { cn } from "@/lib/utils";

// The mark: a speech balloon in red pen, asking. Same geometry as app/icon.svg.
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={cn("size-6", className)}>
      <path
        className="fill-accent"
        d="M16 3C9.4 3 4 7.6 4 13.5c0 3 1.4 5.7 3.7 7.6L6 27l6.2-3.1c1.2.3 2.5.5 3.8.5 6.6 0 12-4.6 12-10.5S22.6 3 16 3Z"
      />
      <path
        className="stroke-accent-foreground"
        fill="none"
        strokeWidth="2.6"
        strokeLinecap="round"
        d="M12.5 10.5a3.5 3.5 0 1 1 5 3.2c-1 .5-1.5 1.2-1.5 2.3v.5"
      />
      <circle className="fill-accent-foreground" cx="16" cy="19.8" r="1.6" />
    </svg>
  );
}
