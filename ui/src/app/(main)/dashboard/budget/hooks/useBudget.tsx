"use client";
import { useState, useEffect } from "react";
import { MONTHS } from "../utils/constants/budgetData";
import {
  IBudgetCategory,
  IBudgetSummary,
  IBudgetAlert,
  IBudgetOption,
} from "../types/budget";
import { IBudgetRequest } from "@/interfaces/budgetRequest";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { budgetService } from "@/services/budget";
import { categoryService } from "@/services/category";
import useAuthListener from "../../hooks/useAuthListener";
import { toast } from "sonner";
import { SelectOption } from "@/interfaces/selectOption";
import {
  mapBackendBudgetToUI,
  mapBackendBudgetSummaryToUI,
  mapBackendBudgetsToAlerts,
  getMonthName,
  getYear,
  getCurrentMonthISO,
} from "../utils/functions/budgetMapper";

export interface IModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedCategory?: IBudgetCategory;
}

export interface IDetailsModalState {
  isOpen: boolean;
  selectedCategory?: IBudgetCategory;
}

export interface IDeleteConfirmationModal {
  isOpen: boolean;
  budgetId?: number;
}

export interface IBudgetData {
  categories: IBudgetCategory[];
  summary: IBudgetSummary;
  alerts: IBudgetAlert[];
  availableCategories: SelectOption[];
  months: typeof MONTHS;
  modal: IModalState;
  detailsModal: IDetailsModalState;
  deleteConfirmationModal: IDeleteConfirmationModal;
  selectedMonth: string;
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
}

export interface IBudgetActions {
  handleAddCategory: () => void;
  handleCategoryClick: (categoryId: number) => void;
  handleViewCategoryDetails: (categoryId: number) => void;
  handleEditCategory: (categoryId: number) => void;
  handleDeleteCategory: (budgetId: number) => void;
  openAddModal: () => void;
  openEditModal: (category: IBudgetCategory) => void;
  closeModal: () => void;
  handleModalSubmit: (data: IBudgetRequest) => void;
  openDetailsModal: (category: IBudgetCategory) => void;
  closeDetailsModal: () => void;
  handleEditFromDetails: () => void;
  handleMonthChange: (month: string) => void;
  closeDeleteConfirmation: () => void;
  handleConfirmDelete: () => void;
  getCategoryOptions: (category: IBudgetCategory) => IBudgetOption[];
}

export interface IUseBudget extends IBudgetData, IBudgetActions {}

export default function useBudget(): IUseBudget {
  const { user } = useAuthListener();

  // State
  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    mode: "add",
    selectedCategory: undefined,
  });

  const [detailsModal, setDetailsModal] = useState<IDetailsModalState>({
    isOpen: false,
    selectedCategory: undefined,
  });

  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<IDeleteConfirmationModal>({
      isOpen: false,
      budgetId: undefined,
    });

  const [selectedMonth, setSelectedMonth] = useState<string>(
    getCurrentMonthISO()
  );
  const [categories, setCategories] = useState<IBudgetCategory[]>([]);
  const [summary, setSummary] = useState<IBudgetSummary>({
    totalBudgeted: 0,
    totalSpent: 0,
    remaining: 0,
    percentageSpent: 0,
    month: getMonthName(new Date()),
    year: getYear(new Date()),
  });
  const [alerts, setAlerts] = useState<IBudgetAlert[]>([]);
  const [availableCategories, setAvailableCategories] = useState<
    SelectOption[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch categories on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  // Fetch budgets when month changes
  useEffect(() => {
    if (user?.id) {
      fetchBudgets();
    }
  }, [selectedMonth, user?.id]);

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getAllCategories();

      if (response.status >= 400) {
        console.error("Failed to fetch categories");
        return;
      }

      const categories = response.data || [];
      const options: SelectOption[] = categories.map((cat: any) => ({
        value: cat.id.toString(),
        label: cat.name,
      }));
      setAvailableCategories(options);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchBudgets = async () => {
    if (!user?.id) {
      console.log("No user ID available");
      return;
    }
    try {
      setIsLoading(true);
      console.log(
        "Fetching budgets for month:",
        selectedMonth,
        "user:",
        user.id
      );

      const response = await budgetService.getMonthlyBudgetOverview(
        user.id,
        selectedMonth
      );

      console.log("Budget response:", response);

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to fetch budgets",
          duration: 2000,
        });
        return;
      }

      const data = response.data;
      console.log("Budget data:", data);

      if (!data || !data.budgets) {
        console.log("No budgets data received");
        setCategories([]);
        return;
      }

      const mappedCategories = data.budgets.map(mapBackendBudgetToUI);
      console.log("Mapped categories:", mappedCategories);
      setCategories(mappedCategories);

      const mappedSummary = mapBackendBudgetSummaryToUI(
        data,
        getMonthName(selectedMonth),
        getYear(selectedMonth)
      );
      setSummary(mappedSummary);

      const mappedAlerts = mapBackendBudgetsToAlerts(data.budgets);
      setAlerts(mappedAlerts);
    } catch (error) {
      console.error("Error fetching budgets:", error);
      toast.error("Error", {
        description: "Failed to fetch budgets",
        duration: 2000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCategory = () => {
    openAddModal();
  };

  const handleCategoryClick = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      openDetailsModal(category);
    }
  };

  const handleViewCategoryDetails = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      openDetailsModal(category);
    }
  };

  const handleEditCategory = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      openEditModal(category);
    }
  };

  const handleDeleteCategory = (budgetId: number) => {
    setDeleteConfirmationModal({
      isOpen: true,
      budgetId,
    });
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  const getCategoryOptions = (category: IBudgetCategory): IBudgetOption[] => [
    {
      id: "view",
      text: "View Details",
      icon: <IconEye size={16} />,
      onClick: () => handleViewCategoryDetails(category.id),
    },
    {
      id: "edit",
      text: "Edit Category",
      icon: <IconEdit size={16} />,
      onClick: () => handleEditCategory(category.id),
    },
    {
      id: "delete",
      text: "Delete Category",
      icon: <IconTrash size={16} />,
      onClick: () => handleDeleteCategory(category.id),
      variant: "danger",
    },
  ];

  const openAddModal = () => {
    setModal({
      isOpen: true,
      mode: "add",
      selectedCategory: undefined,
    });
  };

  const openEditModal = (category: IBudgetCategory) => {
    setModal({
      isOpen: true,
      mode: "edit",
      selectedCategory: category,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      mode: "add",
      selectedCategory: undefined,
    });
  };

  const handleModalSubmit = async (data: IBudgetRequest) => {
    if (!user?.id) return;
    try {
      setIsSubmitting(true);
      const isEdit = modal.mode === "edit";
      let response;

      if (isEdit && modal.selectedCategory) {
        response = await budgetService.updateBudget(
          user.id,
          modal.selectedCategory.id,
          data
        );
      } else {
        response = await budgetService.createBudget(user.id, data);
      }

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to save budget",
          duration: 2000,
        });
        return;
      }

      toast.success("Success", {
        description: isEdit
          ? "Budget updated successfully"
          : "Budget created successfully",
        duration: 2000,
      });

      closeModal();
      fetchBudgets();
    } catch (error) {
      console.error("Error submitting budget:", error);
      toast.error("Error", {
        description: "Failed to save budget",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openDetailsModal = (category: IBudgetCategory) => {
    setDetailsModal({
      isOpen: true,
      selectedCategory: category,
    });
  };

  const closeDetailsModal = () => {
    setDetailsModal({
      isOpen: false,
      selectedCategory: undefined,
    });
  };

  const handleEditFromDetails = () => {
    if (detailsModal.selectedCategory) {
      closeDetailsModal();
      openEditModal(detailsModal.selectedCategory);
    }
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationModal({
      isOpen: false,
      budgetId: undefined,
    });
  };

  const handleConfirmDelete = async () => {
    if (!user?.id || !deleteConfirmationModal.budgetId) return;
    try {
      setIsDeleting(true);
      const response = await budgetService.deleteBudget(
        user.id,
        deleteConfirmationModal.budgetId
      );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to delete budget",
          duration: 2000,
        });
        return;
      }

      toast.success("Success", {
        description: "Budget deleted successfully",
        duration: 2000,
      });

      closeDetailsModal();
      closeDeleteConfirmation();
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
      toast.error("Error", {
        description: "Failed to delete budget",
        duration: 2000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    // Data
    categories,
    summary,
    alerts,
    availableCategories,
    months: MONTHS,
    modal,
    detailsModal,
    deleteConfirmationModal,
    selectedMonth,
    isLoading,
    isSubmitting,
    isDeleting,

    // Actions
    handleAddCategory,
    handleCategoryClick,
    handleViewCategoryDetails,
    handleEditCategory,
    handleDeleteCategory,
    openAddModal,
    openEditModal,
    closeModal,
    handleModalSubmit,
    openDetailsModal,
    closeDetailsModal,
    handleEditFromDetails,
    handleMonthChange,
    closeDeleteConfirmation,
    handleConfirmDelete,
    getCategoryOptions,
  };
}
