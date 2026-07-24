export type ViewKey = "overview" | "dashboard" | "health" | "all" | "add";

export function Sidebar({ selected, onSelect }: { selected: ViewKey; onSelect: (v: ViewKey) => void }) {
  const items: { key: ViewKey; label: string; hint?: string }[] = [
    { key: "overview", label: "Dashboard", hint: "Overview" },
    { key: "dashboard", label: "Priority Alerts", hint: "Action needed" },
    { key: "health", label: "Performance", hint: "Catch-rate & summary" },
    { key: "all", label: "All Applications", hint: "All tracked items" },
    { key: "add", label: "Add Job", hint: "Track a new application" },
  ];

  return (
<aside className="hidden md:fixed md:left-6 md:top-28 md:h-[calc(100vh-7.5rem)] md:w-64 md:rounded-xl md:border md:border-[var(--color-border)] md:bg-[var(--color-surface)] md:p-4 md:block">      <nav className="flex h-full flex-col justify-start gap-3">
        <div className="mb-2 px-2">
          {/* <div className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">Signal</div> */}
          {/* <div className="text-xs text-[var(--color-text-dim)]">Your curated alerts</div> */}
        </div>
        <div className="flex-1 overflow-auto px-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => onSelect(it.key)}
              className={`flex w-full items-start justify-between gap-2 rounded-2xl px-4 py-3 text-left text-lg transition hover:bg-[var(--color-surface-raised)]/40 ${
                selected === it.key ? "bg-[var(--color-surface-raised)] shadow-sm" : ""
              }`}
            >
              <div>
                <div className="font-medium text-[var(--color-text)]">{it.label}</div>
                {it.hint && <div className="text-sm text-[var(--color-text-dim)]">{it.hint}</div>}
              </div>
              <div className="text-sm text-[var(--color-text-dim)]">›</div>
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;
