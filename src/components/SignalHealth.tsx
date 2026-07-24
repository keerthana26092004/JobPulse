import type { Entry } from "../types";

export function SignalHealth({ entries }: { entries: Entry[] }) {
  const resolved = entries.filter((e) => e.status === "done" || e.status === "missed");
  const caught = entries.filter((e) => e.status === "done").length;
  const missed = entries.filter((e) => e.status === "missed").length;
  const total = resolved.length;
  const rate = total === 0 ? null : Math.round((caught / total) * 100);

  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const progress = rate === null ? 0 : (rate / 100) * circumference;

  return (
    
    <section className="flex flex-col gap-4">
            <p className="max-w-md text-sm text-[var(--color-text-dim)]">
                  A complete, filterable record of every application and update you're tracking
           </p>
    <div className="flex items-center gap-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      
      <div className="relative shrink-0">
        
        <svg width="88" height="88" viewBox="0 0 88 88" className="-rotate-90">
          <circle
            cx="44"
            cy="44"
            r={radius}
            fill="none"
            stroke="var(--color-noise-dim)"
            strokeWidth="8"
          />
          {rate !== null && (
            <circle
              cx="44"
              cy="44"
              r={radius}
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress} ${circumference}`}
              className="transition-all duration-500"
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
            {rate === null ? "—" : `${rate}%`}
          </span>
        </div>
      </div>
      <div>
        <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)]">
          Signal Health
        </p>
        <p className="mt-0.5 text-sm text-[var(--color-text-dim)]">
          {total === 0
            ? "Resolve a few items and this will show your catch rate over time."
            : `You've caught ${caught} of ${total} tracked deadlines on time` +
              (missed > 0 ? ` — ${missed} slipped through.` : ".")}
        </p>
      </div>
      </div>
    </section>
  );
}
