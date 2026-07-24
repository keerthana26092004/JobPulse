import { useMemo, useState } from "react";
import type { Entry, EntryStatus } from "../types";
import { ENTRY_TYPE_LABELS } from "../types";
import { formatDateTime } from "../urgency";

const STATUS_LABEL: Record<EntryStatus, string> = {
  pending: "Pending",
  done: "Done",
  missed: "Missed",
};

const STATUS_COLOR: Record<EntryStatus, string> = {
  pending: "text-[var(--color-signal)]",
  done: "text-[var(--color-success)]",
  missed: "text-[var(--color-danger)]",
};

export function EntryList({
  entries,
  onDelete,
}: {
  entries: Entry[];
  onDelete: (id: string) => void;
}) {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const sources = useMemo(
    () => Array.from(new Set(entries.map((e) => e.source))).sort(),
    [entries],
  );

  const filtered = entries
    .filter((e) => sourceFilter === "all" || e.source === sourceFilter)
    .filter((e) => statusFilter === "all" || e.status === statusFilter)
    .sort((a, b) => new Date(b.criticalDate).getTime() - new Date(a.criticalDate).getTime());

  return (
    <section>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center justify-between gap-4">
            <p className="max-w-md text-sm text-[var(--color-text-dim)]">
                  A complete, filterable record of every application and update you're tracking
           </p> 
        </div>
        <h2 className="font-[var(--font-display)] text-sm font-semibold uppercase tracking-wide text-[var(--color-text-dim)]">
          Everything you're tracking
        </h2>
        <div className="flex gap-2">
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-text-dim)]"
          >
            <option value="all">All sources</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1.5 text-xs text-[var(--color-text-dim)]"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="done">Done</option>
            <option value="missed">Missed</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-[var(--color-border)] p-6 text-center text-sm text-[var(--color-text-dim)]">
          Nothing here yet. Add your first application or deadline above.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--color-surface)] text-xs uppercase tracking-wide text-[var(--color-text-dim)]">
              <tr>
                <th className="px-4 py-2.5 font-medium">Company</th>
                <th className="px-4 py-2.5 font-medium">Source</th>
                <th className="px-4 py-2.5 font-medium">Type</th>
                <th className="px-4 py-2.5 font-medium">When</th>
                <th className="px-4 py-2.5 font-medium">Status</th>
                <th className="px-4 py-2.5" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr
                  key={entry.id}
                  className="border-t border-[var(--color-border)] hover:bg-[var(--color-surface)]/60"
                >
                  <td className="px-4 py-2.5">
                    <div className="font-medium text-[var(--color-text)]">{entry.company}</div>
                    <div className="text-xs text-[var(--color-text-dim)]">{entry.role}</div>
                  </td>
                  <td className="px-4 py-2.5 text-[var(--color-text-dim)]">{entry.source}</td>
                  <td className="px-4 py-2.5 text-[var(--color-text-dim)]">
                    {ENTRY_TYPE_LABELS[entry.type]}
                  </td>
                  <td className="px-4 py-2.5 font-[var(--font-mono)] text-xs text-[var(--color-text-dim)]">
                    {formatDateTime(entry.criticalDate)}
                  </td>
                  <td className={`px-4 py-2.5 font-medium ${STATUS_COLOR[entry.status]}`}>
                    {STATUS_LABEL[entry.status]}
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <button
                      onClick={() => onDelete(entry.id)}
                      className="text-xs text-[var(--color-text-dim)] hover:text-[var(--color-danger)]"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
