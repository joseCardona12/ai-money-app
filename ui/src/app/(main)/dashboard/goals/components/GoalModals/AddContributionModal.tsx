"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import FormFieldDate from "@/ui/components/FormFieldDate";
import FormFieldTextarea from "@/ui/components/FormFieldTextarea";
import useContributionForm from "../../hooks/useContributionForm";
import { IGoal } from "../../types/goals";
import { IContributionRequest } from "@/interfaces/contributionRequest";

interface AddContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: IGoal | null;
  onSubmit: (goalId: number, data: IContributionRequest) => void;
  isSubmitting?: boolean;
}

export default function AddContributionModal({
  isOpen,
  onClose,
  goal,
  onSubmit,
  isSubmitting = false,
}: AddContributionModalProps): React.ReactNode {
  const { control, handleSubmit, errors, handleCancel } = useContributionForm({
    onSubmit: (data) => {
      if (goal) {
        onSubmit(goal.id, data);
      }
    },
    onCancel: onClose,
  });

  if (!isOpen || !goal) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const remainingAmount = goal.targetAmount - goal.currentAmount;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Contribution">
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
              style={{ backgroundColor: goal.color }}
            >
              {goal.icon}
            </div>
            <div>
              <h3 className="font-semibold text-base text-gray-900">
                {goal.title}
              </h3>
              <p className="text-sm text-gray-600">{goal.description}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Current Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {((goal.currentAmount / goal.targetAmount) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="text-lg font-bold text-gray-900 mb-2">
              {formatCurrency(goal.currentAmount)} /{" "}
              {formatCurrency(goal.targetAmount)}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${(goal.currentAmount / goal.targetAmount) * 100}%`,
                  backgroundColor: goal.color,
                }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {formatCurrency(remainingAmount)} remaining to reach your goal
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <FormFieldNumber<IContributionRequest>
            label="Contribution Amount"
            name="amount"
            control={control}
            error={errors.amount}
            placeholder="0.00"
          />

          {/* Date */}
          <FormFieldDate<IContributionRequest>
            label="Date"
            name="date"
            control={control}
            error={errors.date}
          />

          {/* Description */}
          <FormFieldTextarea<IContributionRequest>
            label="Description (Optional)"
            name="description"
            control={control}
            error={errors.description}
            placeholder="e.g., Monthly savings, bonus contribution..."
            isOptional
          />

          {/* Action Buttons */}
          <div
            className={`flex items-center justify-end gap-3 pt-4 border-t border-gray-200 ${
              isSubmitting ? "opacity-50" : ""
            }`}
          >
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={isSubmitting}
              className={isSubmitting ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Adding...
                </span>
              ) : (
                "Add Contribution"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
