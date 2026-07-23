export type EntryType = "assessment" | "interview" | "deadline" | "referral" | "followup";

export type EntryStatus = "pending" | "done" | "missed";

export interface Entry {
  id: string;
  company: string;
  role: string;
  source: string; // portal or channel: Naukri, Internshala, Referral, Company Site, etc.
  type: EntryType;
  criticalDate: string; // ISO datetime string
  referredBy?: string;
  notes?: string;
  status: EntryStatus;
  createdAt: string;
}

export const ENTRY_TYPE_LABELS: Record<EntryType, string> = {
  assessment: "Assessment",
  interview: "Interview",
  deadline: "Deadline",
  referral: "Referral follow-up",
  followup: "Follow-up",
};

export const TRACKABLE_CATEGORIES: { key: EntryType; label: string; hint: string }[] = [
  { key: "assessment", label: "Assessments", hint: "coding rounds, aptitude tests" },
  { key: "interview", label: "Interviews", hint: "HR, technical, panel rounds" },
  { key: "deadline", label: "Application deadlines", hint: "last date to apply" },
  { key: "referral", label: "Referral follow-ups", hint: "who you asked, who to thank" },
  { key: "followup", label: "General follow-ups", hint: "anything else time-sensitive" },
];

export interface User {
  username: string;
  email: string;
  trackedCategories: EntryType[];
}
