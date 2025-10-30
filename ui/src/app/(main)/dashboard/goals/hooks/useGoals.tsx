"use client";
import { useState } from "react";
import { IGoal, IOverallProgress, IGoalOption } from "../types/goals";
import { IGoalRequest } from "@/interfaces/goalRequest";
import { IContributionRequest } from "@/interfaces/contributionRequest";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { goalService } from "@/services/goals";
import { toast } from "sonner";
import useAuthListener from "../../hooks/useAuthListener";
import useGoalsList from "./useGoalsList";
import useGoalFormData from "./useGoalFormData";
import { GOAL_CATEGORIES, GOAL_COLORS } from "../utils/constants/goalsData";

export interface IModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedGoal?: IGoal;
}

export interface IContributionModalState {
  isOpen: boolean;
  selectedGoal?: IGoal;
}

export interface IDetailsModalState {
  isOpen: boolean;
  selectedGoal?: IGoal;
}

export interface IDeleteConfirmationModal {
  isOpen: boolean;
  goalId?: number;
}

export interface IGoalsData {
  goals: IGoal[];
  overallProgress: IOverallProgress;
  goalCategories: typeof GOAL_CATEGORIES;
  goalColors: typeof GOAL_COLORS;
  modal: IModalState;
  contributionModal: IContributionModalState;
  detailsModal: IDetailsModalState;
  deleteConfirmationModal: IDeleteConfirmationModal;
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
}

export interface IGoalsActions {
  handleAddGoal: () => void;
  handleGoalClick: (goalId: number) => void;
  handleViewGoalDetails: (goalId: number) => void;
  handleEditGoal: (goalId: number) => void;
  handleDeleteGoal: (goalId: number) => void;
  handleAddContribution: (goalId: number) => void;
  openAddModal: () => void;
  openEditModal: (goal: IGoal) => void;
  closeModal: () => void;
  handleModalSubmit: (data: IGoalRequest) => void;
  openContributionModal: (goal: IGoal) => void;
  closeContributionModal: () => void;
  handleContributionSubmit: (
    goalId: number,
    data: IContributionRequest
  ) => void;
  closeDetailsModal: () => void;
  closeDeleteConfirmation: () => void;
  handleConfirmDelete: () => void;
  getGoalOptions: (goal: IGoal) => IGoalOption[];
}

export interface IUseGoals extends IGoalsData, IGoalsActions {}

export default function useGoals(): IUseGoals {
  const { user } = useAuthListener();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    mode: "add",
    selectedGoal: undefined,
  });

  const [contributionModal, setContributionModal] =
    useState<IContributionModalState>({
      isOpen: false,
      selectedGoal: undefined,
    });

  const [detailsModal, setDetailsModal] = useState<IDetailsModalState>({
    isOpen: false,
    selectedGoal: undefined,
  });

  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<IDeleteConfirmationModal>({
      isOpen: false,
      goalId: undefined,
    });

  // Orchestrate all sub-hooks
  const listHook = useGoalsList();
  const formDataHook = useGoalFormData();

  // Callback to refresh goals after deletion
  const handleGoalsRefresh = () => {
    listHook.setIsFetching(!listHook.isFetching);
  };

  const handleAddGoal = () => {
    openAddModal();
  };

  const handleGoalClick = (goalId: number) => {
    console.log("Goal clicked:", goalId);
  };

  const handleViewGoalDetails = (goalId: number) => {
    const goal = listHook.goals.find((g: IGoal) => g.id === goalId);
    if (goal) {
      openDetailsModal(goal);
    }
  };

  const handleEditGoal = (goalId: number) => {
    const goal = listHook.goals.find((g: IGoal) => g.id === goalId);
    if (goal) {
      openEditModal(goal);
    }
  };

  const handleDeleteGoal = (goalId: number) => {
    setDeleteConfirmationModal({
      isOpen: true,
      goalId,
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationModal({
      isOpen: false,
      goalId: undefined,
    });
  };

  const handleConfirmDelete = async () => {
    if (!user?.id || !deleteConfirmationModal.goalId) return;
    try {
      setIsDeleting(true);
      const response = await goalService.deleteGoal(
        user.id,
        deleteConfirmationModal.goalId
      );

      // Check if response has error status
      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to delete goal",
          duration: 2000,
        });
        return;
      }

      toast.success("Success", {
        description: "Goal deleted successfully",
        duration: 2000,
      });
      closeDetailsModal();
      closeDeleteConfirmation();
      handleGoalsRefresh();
    } catch (error) {
      console.error("Error deleting goal:", error);
      toast.error("Error", {
        description: "Failed to delete goal",
        duration: 2000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddContribution = (goalId: number) => {
    const goal = listHook.goals.find((g: IGoal) => g.id === goalId);
    if (goal) {
      openContributionModal(goal);
    }
  };

  const getGoalOptions = (goal: IGoal): IGoalOption[] => [
    {
      id: "view",
      text: "View Details",
      icon: <IconEye size={16} />,
      onClick: () => handleViewGoalDetails(goal.id),
    },
    {
      id: "edit",
      text: "Edit Goal",
      icon: <IconEdit size={16} />,
      onClick: () => handleEditGoal(goal.id),
    },
    {
      id: "delete",
      text: "Delete Goal",
      icon: <IconTrash size={16} />,
      onClick: () => handleDeleteGoal(goal.id),
      variant: "danger" as const,
    },
  ];

  const openAddModal = () => {
    setModal({
      isOpen: true,
      mode: "add",
      selectedGoal: undefined,
    });
  };

  const openEditModal = (goal: IGoal) => {
    setModal({
      isOpen: true,
      mode: "edit",
      selectedGoal: goal,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      mode: "add",
      selectedGoal: undefined,
    });
  };

  const handleModalSubmit = async (data: IGoalRequest) => {
    if (!user?.id) return;
    try {
      setIsSubmitting(true);
      if (modal.mode === "add") {
        // Create new goal
        const response = await goalService.createGoal(user.id, data);

        // Check if response has error status
        if (response.status >= 400) {
          toast.error("Error", {
            description: response.message || "Failed to create goal",
            duration: 2000,
          });
          return;
        }

        toast.success("Success", {
          description: "Goal created successfully",
          duration: 2000,
        });
        handleGoalsRefresh();
      } else if (modal.mode === "edit" && modal.selectedGoal) {
        // Update existing goal
        const response = await goalService.updateGoal(
          user.id,
          modal.selectedGoal.id,
          data
        );

        // Check if response has error status
        if (response.status >= 400) {
          toast.error("Error", {
            description: response.message || "Failed to update goal",
            duration: 2000,
          });
          return;
        }

        toast.success("Success", {
          description: "Goal updated successfully",
          duration: 2000,
        });
        handleGoalsRefresh();
      }
      closeModal();
    } catch (error) {
      console.error("Error submitting goal:", error);
      toast.error("Error", {
        description: "Failed to save goal",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openContributionModal = (goal: IGoal) => {
    setContributionModal({
      isOpen: true,
      selectedGoal: goal,
    });
  };

  const closeContributionModal = () => {
    setContributionModal({
      isOpen: false,
      selectedGoal: undefined,
    });
  };

  const openDetailsModal = (goal: IGoal) => {
    setDetailsModal({
      isOpen: true,
      selectedGoal: goal,
    });
  };

  const closeDetailsModal = () => {
    setDetailsModal({
      isOpen: false,
      selectedGoal: undefined,
    });
  };

  const handleContributionSubmit = async (
    goalId: number,
    data: IContributionRequest
  ) => {
    if (!user?.id) return;
    try {
      setIsSubmitting(true);

      // Find the goal to get current amount
      const goal = listHook.goals.find((g) => g.id === goalId);
      if (!goal) {
        toast.error("Error", {
          description: "Goal not found",
          duration: 2000,
        });
        return;
      }

      // Add contribution to goal
      const response = await goalService.addContribution(
        user.id,
        goalId,
        goal,
        data
      );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to add contribution",
          duration: 2000,
        });
        return;
      }

      toast.success("Success", {
        description: "Contribution added successfully",
        duration: 2000,
      });

      // Refresh goals to get updated data
      handleGoalsRefresh();
      closeContributionModal();
    } catch {
      toast.error("Error", {
        description: "Failed to add contribution",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    // Data
    goals: listHook.goals,
    overallProgress: listHook.overallProgress,
    goalCategories: GOAL_CATEGORIES,
    goalColors: formDataHook.colors,
    modal,
    contributionModal,
    detailsModal,
    deleteConfirmationModal,
    isLoading: listHook.isLoading,
    isSubmitting,
    isDeleting,

    // Actions
    handleAddGoal,
    handleGoalClick,
    handleViewGoalDetails,
    handleEditGoal,
    handleDeleteGoal,
    handleAddContribution,
    openAddModal,
    openEditModal,
    closeModal,
    handleModalSubmit,
    openContributionModal,
    closeContributionModal,
    handleContributionSubmit,
    closeDetailsModal,
    closeDeleteConfirmation,
    handleConfirmDelete,
    getGoalOptions,
  };
}
