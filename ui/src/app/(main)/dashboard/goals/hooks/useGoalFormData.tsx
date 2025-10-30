"use client";
import { useState, useEffect } from "react";
import useAuthListener from "../../hooks/useAuthListener";
import { GOAL_CATEGORIES, GOAL_COLORS, GOAL_ICONS } from "../utils/constants/goalsData";

export interface IGoalFormDataHook {
  categories: typeof GOAL_CATEGORIES;
  colors: typeof GOAL_COLORS;
  icons: typeof GOAL_ICONS;
  isLoading: boolean;
}

/**
 * Hook to load form data for goal creation/editing
 * Provides categories, colors, and icons for the form
 */
export default function useGoalFormData(): IGoalFormDataHook {
  const { user } = useAuthListener();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadFormData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id]);

  const loadFormData = async () => {
    try {
      // In the future, this could fetch categories from backend
      // For now, we use predefined constants
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading form data:", error);
      setIsLoading(false);
    }
  };

  return {
    categories: GOAL_CATEGORIES,
    colors: GOAL_COLORS,
    icons: GOAL_ICONS,
    isLoading,
  };
}

