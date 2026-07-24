import { useCallback, useEffect, useState } from "react";
import type { Entry } from "./types";

const GLOBAL_STORAGE_KEY = "signal:entries";
const SESSION_KEY = "signal:session";

function getUserKey(): string | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const u = JSON.parse(raw) as { email?: string };
    if (!u?.email) return null;
    return `${GLOBAL_STORAGE_KEY}:${u.email}`;
  } catch {
    return null;
  }
}

function load(): Entry[] {
  try {
    const userKey = getUserKey();
    const global = localStorage.getItem(GLOBAL_STORAGE_KEY);

    if (userKey) {
      const per = localStorage.getItem(userKey);
      if (per) {
        if (global) localStorage.removeItem(GLOBAL_STORAGE_KEY);
        return JSON.parse(per) as Entry[];
      }

      if (global) {
        try {
          const parsed = JSON.parse(global) as Entry[];
          localStorage.setItem(userKey, JSON.stringify(parsed));
          localStorage.removeItem(GLOBAL_STORAGE_KEY);
          return parsed;
        } catch {
          localStorage.removeItem(GLOBAL_STORAGE_KEY);
        }
      }

      return [];
    }

    if (!global) return [];
    return JSON.parse(global) as Entry[];
  } catch {
    return [];
  }
}

function save(entries: Entry[]) {
  try {
    const userKey = getUserKey();
    if (userKey) {
      localStorage.setItem(userKey, JSON.stringify(entries));
    } else {
      localStorage.setItem(GLOBAL_STORAGE_KEY, JSON.stringify(entries));
    }
  } catch {
    // storage unavailable — fail silently, app still works for the session
  }
}

export function useEntries() {
  const [entries, setEntries] = useState<Entry[]>(() => load());

  useEffect(() => {
    save(entries);
  }, [entries]);

  // Reload entries when the session changes (login / logout / signup)
  useEffect(() => {
    function onSessionChange() {
      setEntries(load());
    }
    window.addEventListener("signal:session-changed", onSessionChange);
    return () => window.removeEventListener("signal:session-changed", onSessionChange);
  }, []);

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

  // demo / seed function intentionally removed to keep user data exact.
  // Previously there was a `seedDemoData` helper here that populated example entries.
  // To ensure users only see data they enter, we do not provide that helper anymore.

  return { entries, addEntry, updateEntry, deleteEntry };
}
