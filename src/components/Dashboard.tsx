import type { Entry } from "../types";
import { ENTRY_TYPE_LABELS, TRACKABLE_CATEGORIES } from "../types";
import { formatCountdown, formatDateTime, getUrgency } from "../urgency";
import BarChart from "./BarChart";

const URGENCY_STYLES: Record<string, string> = {
  overdue: "border-[var(--color-danger)]/50 bg-[var(--color-danger)]/10",
  today: "border-[var(--color-signal)]/60 bg-[var(--color-signal)]/10",
  soon: "border-[var(--color-signal-dim)] bg-[var(--color-signal)]/5",
};

const URGENCY_DOT: Record<string, string> = {
  overdue: "bg-[var(--color-danger)]",
  today: "bg-[var(--color-signal)]",
  soon: "bg-[var(--color-signal-dim)]",
};

export function Dashboard({
  entries,
  onMark,
  readOnly = false,
}: {
  entries: Entry[];
  onMark?: (id: string, status: "done" | "missed") => void;
  readOnly?: boolean;
}) {
  const counts = TRACKABLE_CATEGORIES.map((c) => ({
    label: c.label,
    value: entries.filter((e) => e.type === c.key && e.status === "pending").length,
  }));

  const urgent = entries
    .filter((e) => e.status === "pending")
    .map((e) => ({ entry: e, urgency: getUrgency(e) }))
    .filter(({ urgency }) => urgency === "overdue" || urgency === "today" || urgency === "soon")
    .sort((a, b) => new Date(a.entry.criticalDate).getTime() - new Date(b.entry.criticalDate).getTime());

  if (urgent.length === 0) {
    return (
      <section className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 text-center">
        <p className="font-[var(--font-display)] text-lg text-[var(--color-text)]">
          Clear for now.
        </p>
        <p className="mt-1 text-sm text-[var(--color-text-dim)]">
          Nothing urgent in the next 3 days. Add something the moment it lands in your inbox — that's the habit that matters.
        </p>
      </section>
    );
  }

  return (
    <section>
      
      <h2 className="mb-3 font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
        Don't miss this
      </h2>
      <div className="flex items-center justify-between gap-4">
            <p className="max-w-md text-sm text-[var(--color-text-dim)] md-2">
Time-sensitive items that need your attention in the next few days            </p>
            </div>
      <div className="mb-4">
        <BarChart data={counts} />
      </div>
      <div className="flex flex-col gap-3">
        {urgent.map(({ entry, urgency }) => (
          <div
            key={entry.id}
            className={`flex flex-col gap-3 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between ${URGENCY_STYLES[urgency]}`}
          >
            <div className="flex items-start gap-3">
              <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${URGENCY_DOT[urgency]}`} />
              <div>
                <p className="font-medium text-[var(--color-text)]">
                  {entry.company} — {ENTRY_TYPE_LABELS[entry.type]}
                </p>
                <p className="text-sm text-[var(--color-text-dim)]">
                  {entry.role} · via {entry.source}
                </p>
                <p className="mt-1 font-[var(--font-mono)] text-xs text-[var(--color-text-dim)]">
                  {formatDateTime(entry.criticalDate)} · {formatCountdown(entry)}
                </p>
              </div>
            </div>
            {!readOnly && (
              <div className="flex gap-2 pl-5 sm:pl-0">
                <button
                  onClick={() => onMark?.(entry.id, "done")}
                  className="rounded-lg border border-[var(--color-success)]/40 px-3 py-1.5 text-xs font-medium text-[var(--color-success)] transition hover:bg-[var(--color-success)]/10"
                >
                  Done
                </button>
                <button
                  onClick={() => onMark?.(entry.id, "missed")}
                  className="rounded-lg border border-[var(--color-border)] px-3 py-1.5 text-xs font-medium text-[var(--color-text-dim)] transition hover:bg-[var(--color-noise)]/10"
                >
                  Missed
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
