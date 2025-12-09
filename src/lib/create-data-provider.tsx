// lib/create-data-provider.tsx
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export function createDataProvider<T>(key: string) {
  type Value = {
    data: T;
    setData: (d: T) => void;
    refresh: (signal?: AbortSignal) => Promise<void>;
    isRefreshing: boolean;
  };

  const Ctx = createContext<Value | undefined>(undefined);

  function Provider({
    initial,
    children,
  }: {
    initial: T;
    children: React.ReactNode;
  }) {
    const [data, setData] = useState<T>(initial);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const refresh = useCallback(async (signal?: AbortSignal) => {
      try {
        setIsRefreshing(true);
        const res = await fetch(`/api/${key}?limit=200`, {
          cache: "no-store",
          signal,
        });
        if (!res.ok) throw new Error(`Failed to fetch ${key}`);
        const json = await res.json();
        // prefer { data: [...] } shape, fallback to raw
        const payload = json && json.data ? json.data : json;
        setData(payload as T);
      } catch (err) {
        // ignore abort errors, log others
        if ((err as any)?.name !== "AbortError") {
          console.error(`Refresh ${key} failed:`, err);
        }
      } finally {
        setIsRefreshing(false);
      }
    }, []);

    // Auto-fetch on mount when initial is empty/falsy.
    useEffect(() => {
      const ac = new AbortController();

      const isEmptyInitial = Array.isArray(initial)
        ? (initial as unknown as any[]).length === 0
        : !initial;

      if (isEmptyInitial) {
        // we don't await here — allow the provider to mount immediately
        // and fetch in background
        refresh(ac.signal).catch(() => {});
      }

      return () => {
        ac.abort();
      };
      // initial intentionally included so provider reacts if a different initial passed
    }, [initial, refresh]);

    return (
      <Ctx.Provider value={{ data, setData, refresh, isRefreshing }}>
        {children}
      </Ctx.Provider>
    );
  }

  function useData() {
    const ctx = useContext(Ctx);
    if (!ctx) throw new Error(`use${key} must be used within ${key} Provider`);
    return ctx;
  }

  return { Provider, useData };
}
