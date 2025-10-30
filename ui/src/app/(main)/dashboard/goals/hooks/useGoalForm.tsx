"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  goalFormSchema,
  GoalFormData,
  CURRENT_FORM_GOAL,
} from "../utils/constants/goalFormSchema";
import { IGoal } from "../types/goals";
import { IGoalRequest } from "@/interfaces/goalRequest";

interface UseGoalFormProps {
  mode: "add" | "edit";
  goal?: IGoal;
  onSubmit: (data: IGoalRequest) => void;
  onCancel: () => void;
}

export default function useGoalForm({
  mode,
  goal,
  onSubmit,
  onCancel,
}: UseGoalFormProps) {
  const defaultValues: GoalFormData =
    mode === "edit" && goal
      ? {
          title: goal.title,
          description: goal.description,
          targetAmount: goal.targetAmount,
          currentAmount: goal.currentAmount,
          deadline: goal.deadline,
          category: goal.category,
          color: goal.color,
          icon: goal.icon,
        }
      : CURRENT_FORM_GOAL;

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GoalFormData>({
    resolver: zodResolver(goalFormSchema),
    defaultValues,
  });

  // Reset form when goal changes (for edit mode)
  useEffect(() => {
    if (mode === "edit" && goal) {
      reset({
        title: goal.title,
        description: goal.description,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline,
        category: goal.category,
        color: goal.color,
        icon: goal.icon,
      });
    } else if (mode === "add") {
      reset(CURRENT_FORM_GOAL);
    }
  }, [mode, goal, reset]);

  const handleFormSubmit = (data: GoalFormData) => {
    const goalRequest: IGoalRequest = {
      title: data.title,
      description: data.description,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount,
      deadline: data.deadline,
      category: data.category,
      color: data.color,
      icon: data.icon,
    };
    onSubmit(goalRequest);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    handleCancel,
  };
}
