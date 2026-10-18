import { useRef, type KeyboardEvent } from "react";

// ids end up in id / aria-labelledby, which split on whitespace, so they must be slugs.
const slug = (id: string) => id.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

// WAI-ARIA tabs: one tab stop, arrows/Home/End move focus and selection together.
export function useRovingTabs<T extends string>(ids: readonly T[], active: T, setActive: (id: T) => void) {
  const refs = useRef(new Map<T, HTMLButtonElement | null>());

  function focusTab(id: T) {
    refs.current.get(id)?.focus();
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const i = ids.indexOf(active);
    const next = {
      ArrowRight: ids[(i + 1) % ids.length],
      ArrowLeft: ids[(i - 1 + ids.length) % ids.length],
      Home: ids[0],
      End: ids[ids.length - 1],
    }[event.key];
    if (!next) return;
    event.preventDefault();
    setActive(next);
    refs.current.get(next)?.focus();
  }

  return {
    focusTab,
    tabProps: (id: T, prefix: string) => ({
      id: `${prefix}-tab-${slug(id)}`,
      role: "tab" as const,
      type: "button" as const,
      "aria-selected": active === id,
      "aria-controls": `${prefix}-panel`,
      tabIndex: active === id ? 0 : -1,
      onClick: () => setActive(id),
      onKeyDown,
      ref: (el: HTMLButtonElement | null) => {
        refs.current.set(id, el);
      },
    }),
    panelProps: (prefix: string) => ({
      id: `${prefix}-panel`,
      role: "tabpanel" as const,
      "aria-labelledby": `${prefix}-tab-${slug(active)}`,
      tabIndex: 0,
    }),
  };
}
