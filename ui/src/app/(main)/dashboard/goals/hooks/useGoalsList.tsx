"use client";
import { useState, useEffect } from "react";
import { goalService } from "@/services/goals";
import { IGoal } from "../types/goals";
import useAuthListener from "../../hooks/useAuthListener";
import {
  mapBackendGoalsToUI,
  calculateOverallProgress,
} from "../utils/functions/goalMapper";

export interface IGoalsListHook {
  goals: IGoal[];
  isLoading: boolean;
  isFetching: boolean;
  overallProgress: {
    totalCurrent: number;
    totalTarget: number;
    percentage: string;
    description: string;
  };
  loadGoals: () => Promise<void>;
  setIsFetching: (value: boolean) => void;
}

/**
 * Hook to load and manage goals list from backend
 * Handles fetching, mapping, and calculating overall progress
 */
export default function useGoalsList(): IGoalsListHook {
  const { user } = useAuthListener();
  const [goals, setGoals] = useState<IGoal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (user?.id) {
      loadGoals();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, isFetching]);

  const loadGoals = async () => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await goalService.getGoalsByUserId(user.id);

      if (response.status < 400 && response.data) {
        const data = response.data;

        // Handle both array and object responses
        const goalsData = Array.isArray(data) ? data : data.goals || [];

        // Map backend goals to UI format
        const mappedGoals = mapBackendGoalsToUI(goalsData);
        setGoals(mappedGoals);
      }
    } catch (error) {
      console.error("Error loading goals:", error);
      setGoals([]);
    } finally {
      setIsLoading(false);
    }
  };

  const overallProgress = calculateOverallProgress(goals);

  return {
    goals,
    isLoading,
    isFetching,
    overallProgress,
    loadGoals,
    setIsFetching,
  };
}
