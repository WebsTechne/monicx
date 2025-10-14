"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

export function createDataProvider<T>(key: string) {
    type Value = {
        data: T;
        setData: (d: T) => void;
        refresh: () => Promise<void>;
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

        const refresh = useCallback(async () => {
            try {
                setIsRefreshing(true);
                const res = await fetch(`/api/${key}?limit=200`, {
                    cache: "no-store",
                });
                if (!res.ok) throw new Error(`Failed to fetch ${key}`);
                const json = await res.json();
                // prefer { data: [...] } shape, fallback to raw
                const payload = json && json.data ? json.data : json;
                setData(payload as T);
            } catch (err) {
                console.error(`Refresh ${key} failed:`, err);
            } finally {
                setIsRefreshing(false);
            }
        }, []);

        return (
            <Ctx.Provider value={{ data, setData, refresh, isRefreshing }}>
                {children}
            </Ctx.Provider>
        );
    }

    function useData() {
        const ctx = useContext(Ctx);
        if (!ctx)
            throw new Error(`use${key} must be used within ${key} Provider`);
        return ctx;
    }

    return { Provider, useData };
}
