import { useState } from "react";
import type { Entry, EntryType } from "../types";
import { ENTRY_TYPE_LABELS } from "../types";

export function AddEntryForm({
  onAdd,
  onClose,
  allowedTypes,
}: {
  onAdd: (entry: Omit<Entry, "id" | "createdAt" | "status">) => void;
  onClose: () => void;
  allowedTypes: EntryType[];
}) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [source, setSource] = useState("");
  const [type, setType] = useState<EntryType>(allowedTypes[0] ?? "assessment");
  const [date, setDate] = useState("");
  const [referredBy, setReferredBy] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!company.trim() || !date) return;
    onAdd({
      company: company.trim(),
      role: role.trim() || "—",
      source: source.trim() || "Not specified",
      type,
      criticalDate: new Date(date).toISOString(),
      referredBy: referredBy.trim() || undefined,
      notes: notes.trim() || undefined,
    });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-10 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
            Catch something before it's buried
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-text-dim)] hover:text-[var(--color-text)]"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Company">
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Infosys"
                required
                className={inputClass}
              />
            </Field>
            <Field label="Role">
              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="SE Trainee"
                className={inputClass}
              />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Source / portal">
              <input
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="Naukri, referral, email..."
                className={inputClass}
              />
            </Field>
            <Field label="Type">
              <select
                value={type}
                onChange={(e) => setType(e.target.value as EntryType)}
                className={inputClass}
              >
                {allowedTypes.map((t) => (
                  <option key={t} value={t}>
                    {ENTRY_TYPE_LABELS[t]}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Date & time it matters">
            <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className={inputClass}
            />
          </Field>

          {type === "referral" && (
            <Field label="Referred by">
              <input
                value={referredBy}
                onChange={(e) => setReferredBy(e.target.value)}
                placeholder="Name of contact"
                className={inputClass}
              />
            </Field>
          )}

          <Field label="Notes (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Anything you'd forget otherwise"
              className={inputClass}
            />
          </Field>

          <button
            type="submit"
            className="mt-1 rounded-lg bg-[var(--color-signal)] px-4 py-2.5 font-medium text-white transition hover:brightness-110"
          >
            Add to Signal
          </button>
        </form>
      </div>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-signal)] placeholder:text-[var(--color-text-dim)]/60";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-medium text-[var(--color-text-dim)]">{label}</span>
      {children}
    </label>
  );
}
