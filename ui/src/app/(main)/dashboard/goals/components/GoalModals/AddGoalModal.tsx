"use client";
import { Controller } from "react-hook-form";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import FormFieldDate from "@/ui/components/FormFieldDate";
import { SelectOption } from "@/interfaces/selectOption";
import useGoalForm from "../../hooks/useGoalForm";
import { IGoal } from "../../types/goals";
import { IGoalRequest } from "@/interfaces/goalRequest";
import { GOAL_CATEGORIES, GOAL_COLORS } from "../../utils/constants/goalsData";
import { GOAL_ICONS } from "../../utils/constants/goalFormSchema";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  goal?: IGoal;
  onSubmit: (data: IGoalRequest) => void;
}

// Convert constants to SelectOption format
const goalCategoryOptions: SelectOption[] = GOAL_CATEGORIES.map((cat) => ({
  value: cat.value,
  label: cat.label,
}));

const goalColorOptions: SelectOption[] = GOAL_COLORS.map((color) => ({
  value: color.value,
  label: color.label,
}));

export default function AddGoalModal({
  isOpen,
  onClose,
  mode,
  goal,
  onSubmit,
}: AddGoalModalProps): React.ReactNode {
  const { control, handleSubmit, errors, handleCancel } = useGoalForm({
    mode,
    goal,
    onSubmit,
    onCancel: onClose,
  });

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add New Goal" : "Edit Goal"}
    >
      <div className="p-6">
        <div className="mb-6">
          <p className="text-sm" style={{ color: "var(--color-text-gray)" }}>
            {mode === "add"
              ? "Set a new financial goal to track your progress"
              : "Update your goal details"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Title */}
          <FormField<IGoalRequest>
            label="Goal Title"
            name="title"
            control={control}
            error={errors.title}
            placeholder="e.g., Emergency Fund"
          />

          {/* Description */}
          <FormField<IGoalRequest>
            label="Description"
            name="description"
            control={control}
            error={errors.description}
            placeholder="e.g., 6 months of expenses"
          />

          {/* Target Amount */}
          <FormFieldNumber<IGoalRequest>
            label="Target Amount"
            name="targetAmount"
            control={control}
            error={errors.targetAmount}
            placeholder="0"
          />

          {/* Current Amount */}
          <FormFieldNumber<IGoalRequest>
            label="Current Amount"
            name="currentAmount"
            control={control}
            error={errors.currentAmount}
            placeholder="0"
          />

          {/* Deadline */}
          <FormFieldDate<IGoalRequest>
            label="Deadline"
            name="deadline"
            control={control}
            error={errors.deadline}
          />

          {/* Category */}
          <FormFieldSelect<IGoalRequest>
            label="Category"
            name="category"
            control={control}
            error={errors.category}
            placeholder="Select category"
            options={goalCategoryOptions}
          />

          {/* Color */}
          <FormFieldSelect<IGoalRequest>
            label="Color"
            name="color"
            control={control}
            error={errors.color}
            placeholder="Select color"
            options={goalColorOptions}
          />

          {/* Icon */}
          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{ color: "var(--color-text-black)" }}
            >
              Icon
            </label>
            <Controller
              name="icon"
              control={control}
              render={({ field }) => (
                <div className="flex gap-2 flex-wrap">
                  {GOAL_ICONS.map((icon) => (
                    <button
                      key={icon.value}
                      type="button"
                      className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg transition-colors ${
                        field.value === icon.value
                          ? "border-blue-400 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => field.onChange(icon.value)}
                    >
                      {icon.value}
                    </button>
                  ))}
                </div>
              )}
            />
            {errors.icon && (
              <p className="text-xs" style={{ color: "var(--color-red)" }}>
                {errors.icon.message}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {mode === "add" ? "Add Goal" : "Update Goal"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

