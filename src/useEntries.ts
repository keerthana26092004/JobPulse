import { useCallback, useEffect, useState } from "react";
import type { Entry } from "./types";

const STORAGE_KEY = "signal:entries";

function load(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Entry[];
  } catch {
    return [];
  }
}

function save(entries: Entry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // storage unavailable — fail silently, app still works for the session
  }
}

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(() => load());

  useEffect(() => {
    save(entries);
  }, [entries]);

  const addEntry = useCallback((entry: Omit<Entry, "id" | "createdAt" | "status">) => {
    const newEntry: Entry = {
      ...entry,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "pending",
    };
    setEntries((prev) => [...prev, newEntry]);
  }, []);

  const updateEntry = useCallback((id: string, patch: Partial<Entry>) => {
    setEntries((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)));
  }, []);

  const deleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const seedDemoData = useCallback(() => {
    const now = Date.now();
    const hrs = (n: number) => new Date(now + n * 60 * 60 * 1000).toISOString();
    const demo: Entry[] = [
      {
        id: crypto.randomUUID(),
        company: "Infosys",
        role: "Specialist Programmer",
        source: "Company Portal",
        type: "assessment",
        criticalDate: hrs(4),
        status: "pending",
        notes: "Coding assessment — the one that almost got buried before",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        company: "Kaitongo",
        role: "React Developer",
        source: "Naukri",
        type: "interview",
        criticalDate: hrs(30),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        company: "Altos Technologies",
        role: "React + Django Developer",
        source: "Referral",
        type: "referral",
        referredBy: "Senior contact",
        criticalDate: hrs(70),
        status: "pending",
        createdAt: new Date().toISOString(),
      },
      {
        id: crypto.randomUUID(),
        company: "Recruit CRM",
        role: "Customer Success Associate",
        source: "Internshala",
        type: "deadline",
        criticalDate: hrs(-20),
        status: "missed",
        createdAt: new Date().toISOString(),
      },
    ];
    setEntries(demo);
  }, []);

  return { entries, addEntry, updateEntry, deleteEntry, seedDemoData };
}
