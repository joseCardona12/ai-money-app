"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { USER_DATA } from "../utils/constants/layoutData";

export interface IUseDashboardLayout {
  userData: typeof USER_DATA;
  isDarkMode: boolean;
  isLoading: boolean;
  handleMenuItemClick: (href: string) => void;
  toggleDarkMode: () => void;
  refreshData: () => void;
}

export default function useDashboardLayout(): IUseDashboardLayout {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize dark mode from localStorage on mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      applyDarkMode(isDark);
    } else {
      // Check system preference if no saved preference
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setIsDarkMode(systemPrefersDark);
      applyDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply dark mode to document
  const applyDarkMode = (isDark: boolean) => {
    if (typeof document !== "undefined") {
      const htmlElement = document.documentElement;

      if (isDark) {
        htmlElement.classList.add("dark");
        htmlElement.setAttribute("data-theme", "dark");
      } else {
        htmlElement.classList.remove("dark");
        htmlElement.setAttribute("data-theme", "light");
      }

      // Force a repaint to ensure styles are applied
      htmlElement.style.colorScheme = isDark ? "dark" : "light";
    }
  };

  const handleMenuItemClick = (href: string) => {
    if (href && href !== "#") {
      router.push(href);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newDarkMode = !prev;

      // Save to localStorage
      localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
      // Apply to document
      applyDarkMode(newDarkMode);
      return newDarkMode;
    });
  };

  const refreshData = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    userData: USER_DATA,
    isDarkMode,
    isLoading,
    handleMenuItemClick,
    toggleDarkMode,
    refreshData,
  };
}
