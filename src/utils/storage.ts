// Tiny localStorage-backed store. No external state library.
// Swap these functions for API calls when a real backend is added.

import { useSyncExternalStore } from "react";
import { initialData, type SiteData } from "@/data/mockData";

const KEY = "tyb_site_data_v1";
const AUTH_KEY = "tyb_admin_session";

let cache: SiteData = initialData;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function read(): SiteData {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialData;
    const parsed = JSON.parse(raw) as Partial<SiteData>;
    return { ...initialData, ...parsed };
  } catch {
    return initialData;
  }
}

function persist() {
  try {
    localStorage.setItem(KEY, JSON.stringify(cache));
  } catch {
    /* storage unavailable */
  }
}

function subscribe(listener: () => void) {
  if (!hydrated && typeof window !== "undefined") {
    hydrated = true;
    cache = read();
    queueMicrotask(emit);
  }
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getData(): SiteData {
  return cache;
}

export function setData(updater: (d: SiteData) => SiteData) {
  cache = updater(cache);
  persist();
  emit();
}

export function updateSection<K extends keyof SiteData>(key: K, value: SiteData[K]) {
  setData((d) => ({ ...d, [key]: value }));
}

export function resetAll() {
  cache = initialData;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
  emit();
}

export function useSiteData(): SiteData {
  return useSyncExternalStore(subscribe, getData, () => initialData);
}

export function uid() {
  return Math.random().toString(36).slice(2, 10);
}

/* ------------------------- mock auth (demo only) ------------------------- */
// NOT production-secure. Replace with a real auth provider later.
export const DEMO_CREDENTIALS = {
  email: "admin@theyellowbanana.com",
  password: "admin123",
};

export function login(email: string, password: string) {
  const ok =
    email.trim().toLowerCase() === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password;
  if (ok) localStorage.setItem(AUTH_KEY, JSON.stringify({ email, at: Date.now() }));
  return ok;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isLoggedIn() {
  if (typeof window === "undefined") return false;
  return Boolean(localStorage.getItem(AUTH_KEY));
}
