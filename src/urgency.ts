import type { Entry } from "./types";

export type Urgency = "overdue" | "today" | "soon" | "later" | "resolved";

const DAY_MS = 1000 * 60 * 60 * 24;

export function getUrgency(entry: Entry): Urgency {
  if (entry.status === "done" || entry.status === "missed") return "resolved";

  const now = new Date();
  const target = new Date(entry.criticalDate);
  const diffMs = target.getTime() - now.getTime();
  const diffDays = diffMs / DAY_MS;

  if (diffMs < 0) return "overdue";
  if (diffDays < 1) return "today";
  if (diffDays < 3) return "soon";
  return "later";
}

export function formatCountdown(entry: Entry): string {
  const now = new Date();
  const target = new Date(entry.criticalDate);
  const diffMs = target.getTime() - now.getTime();
  const diffHrs = Math.round(diffMs / (1000 * 60 * 60));

  if (entry.status !== "pending") return "";
  if (diffMs < 0) {
    const overdueDays = Math.abs(Math.floor(diffMs / DAY_MS));
    return overdueDays === 0 ? "overdue today" : `${overdueDays}d overdue`;
  }
  if (diffHrs < 24) return diffHrs <= 1 ? "due within the hour" : `in ${diffHrs}h`;
  const diffDays = Math.round(diffHrs / 24);
  return `in ${diffDays}d`;
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}
