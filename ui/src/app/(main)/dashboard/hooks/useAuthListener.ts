"use client";
import { useState, useEffect } from "react";
import { IUser } from "@/interfaces/user";

export default function useAuthListener() {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Get initial values
    const userStr = localStorage.getItem("user");
    const tokenStr = localStorage.getItem("token");

    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    if (tokenStr) {
      setToken(tokenStr);
    }

    // Listen for storage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" && e.newValue) {
        setUser(JSON.parse(e.newValue));
      }
      if (e.key === "token" && e.newValue) {
        setToken(e.newValue);
      }
    };

    // Listen for custom events (for same-tab updates)
    const handleCustomEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail?.type === "user-updated") {
        setUser(customEvent.detail.user);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("user-updated", handleCustomEvent);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("user-updated", handleCustomEvent);
    };
  }, []);

  return { user, token };
}

