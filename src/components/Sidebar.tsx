import React from "react";

export type ViewKey = "overview" | "dashboard" | "health" | "all";

export function Sidebar({ selected, onSelect }: { selected: ViewKey; onSelect: (v: ViewKey) => void }) {
  const items: { key: ViewKey; label: string; hint?: string }[] = [
    { key: "overview", label: "Dashboard", hint: "Overview of everything" },
    { key: "dashboard", label: "Don't miss this", hint: "Urgent items" },
    { key: "health", label: "Signal Health", hint: "Catch-rate & summary" },
    { key: "all", label: "Everything", hint: "All tracked items" },
  ];

  return (
    <aside className="hidden w-56 shrink-0 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-4 md:block">
      <nav className="flex flex-col gap-2">
        {items.map((it) => (
          <button
            key={it.key}
            onClick={() => onSelect(it.key)}
            className={`flex w-full items-start justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition hover:bg-[var(--color-surface-raised)]/40 ${
              selected === it.key ? "bg-[var(--color-surface-raised)] shadow-sm" : ""
            }`}
          >
            <div>
              <div className="font-medium text-[var(--color-text)]">{it.label}</div>
              {it.hint && <div className="text-xs text-[var(--color-text-dim)]">{it.hint}</div>}
            </div>
            <div className="text-xs text-[var(--color-text-dim)]">›</div>
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
