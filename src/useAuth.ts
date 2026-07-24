import { useCallback, useState } from "react";
import type { EntryType, User } from "./types";

// NOTE: This is a client-only mock auth system for the MVP — no backend, no
// real security. Credentials are stored in localStorage on the user's own
// browser only. Good enough to demonstrate the flow; not meant for production.

const USERS_KEY = "signal:users";
const SESSION_KEY = "signal:session";

interface StoredUser extends User {
  password: string;
}

function loadUsers(): Record<string, StoredUser> {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveUsers(users: Record<string, StoredUser>) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const signup = useCallback(
    (email: string, password: string, username: string, trackedCategories: EntryType[]) => {
      const users = loadUsers();
      const key = email.trim().toLowerCase();
      if (users[key]) {
        return { ok: false as const, error: "An account with this email already exists." };
      }
      const user: StoredUser = { email: key, password, username: username.trim(), trackedCategories };
      users[key] = user;
      saveUsers(users);
      const { password: _pw, ...publicUser } = user;
      localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
      setCurrentUser(publicUser);
      try {
        window.dispatchEvent(new Event("signal:session-changed"));
      } catch {
        /* ignore */
      }
      return { ok: true as const };
    },
    [],
  );

  const login = useCallback((email: string, password: string) => {
    const users = loadUsers();
    const key = email.trim().toLowerCase();
    const user = users[key];
    if (!user || user.password !== password) {
      return { ok: false as const, error: "Email or password doesn't match." };
    }
    const { password: _pw, ...publicUser } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(publicUser));
    setCurrentUser(publicUser);
    try {
      window.dispatchEvent(new Event("signal:session-changed"));
    } catch {
      /* ignore */
    }
    return { ok: true as const };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(SESSION_KEY);
    setCurrentUser(null);
    try {
      window.dispatchEvent(new Event("signal:session-changed"));
    } catch {
      /* ignore */
    }
  }, []);

  return { currentUser, signup, login, logout };
}
