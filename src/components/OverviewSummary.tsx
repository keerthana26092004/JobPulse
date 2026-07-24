import type { Entry } from "../types";
import { TRACKABLE_CATEGORIES } from "../types";
import BarChart from "./BarChart";


export function OverviewSummary({ entries }: { entries: Entry[] }) {
  const pending = entries.filter((e) => e.status === "pending").length;
  const done = entries.filter((e) => e.status === "done").length;
  const missed = entries.filter((e) => e.status === "missed").length;
  const total = entries.length;

  const counts = TRACKABLE_CATEGORIES.map((c) => ({
    label: c.label,
    value: entries.filter((e) => e.type === c.key && e.status === "pending").length,
  }));

  return (
    <div className="flex flex-col gap-6">
       <div className="flex items-center justify-between gap-4">
            <p className="max-w-md text-sm text-[var(--color-text-dim)]">
A snapshot of your job search — active applications, upcoming priorities, and your overall progress at a glance            </p> 
        </div>
      <div className="grid grid-cols-3 gap-3">
       
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="text-xs text-[var(--color-text-dim)]">Pending</div>
          <div className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-signal)]">
            {pending}
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="text-xs text-[var(--color-text-dim)]">Done</div>
          <div className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-success)]">
            {done}
          </div>
        </div>
        <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4">
          <div className="text-xs text-[var(--color-text-dim)]">Missed</div>
          <div className="mt-1 font-[var(--font-display)] text-2xl font-semibold text-[var(--color-danger)]">
            {missed}
          </div>
        </div>
      </div>

      <BarChart data={counts} />

      <div className="rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] p-4 text-center">
        <p className="text-sm text-[var(--color-text-dim)]">Total tracked</p>
        <p className="mt-2 font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
          {total} items
        </p>
      </div>
    </div>
  );
}

export default OverviewSummary;
