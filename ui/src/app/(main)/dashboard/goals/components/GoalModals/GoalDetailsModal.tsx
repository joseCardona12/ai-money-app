"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import { IGoal } from "../../types/goals";
import {
  getDaysRemaining,
  formatDeadline,
} from "../../utils/functions/goalMapper";
import { IconEdit, IconPlus } from "@tabler/icons-react";

interface GoalDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: IGoal | null;
  onEdit?: (goal: IGoal) => void;
  onAddContribution?: (goalId: number) => void;
}

export default function GoalDetailsModal({
  isOpen,
  onClose,
  goal,
  onEdit,
  onAddContribution,
}: GoalDetailsModalProps): React.ReactNode {
  if (!isOpen || !goal) return null;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const percentageValue =
    goal.targetAmount > 0 ? (goal.currentAmount / goal.targetAmount) * 100 : 0;
  const percentage = isNaN(percentageValue)
    ? "0.00"
    : percentageValue.toFixed(2);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const isOverdue = daysRemaining < 0;
  const remainingAmount = goal.targetAmount - goal.currentAmount;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Goal Details" size="lg">
      <div className="p-6">
        {/* Goal Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{ backgroundColor: goal.color }}
          >
            {goal.icon}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900">{goal.title}</h2>
            <p className="text-gray-600">{goal.description}</p>
          </div>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-bold text-gray-900">
              {percentage}%
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full mb-3">
            <div
              className="h-3 rounded-full transition-all duration-300"
              style={{
                width: `${Math.min(parseFloat(percentage), 100)}%`,
                backgroundColor: goal.color,
              }}
            ></div>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              {formatCurrency(goal.currentAmount)} /{" "}
              {formatCurrency(goal.targetAmount)}
            </span>
            <span className="text-gray-600">
              {formatCurrency(remainingAmount)} remaining
            </span>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {/* Deadline */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 mb-1">Deadline</p>
            <p className="text-sm font-semibold text-gray-900">
              {formatDeadline(goal.deadline)}
            </p>
            <p
              className={`text-xs mt-1 ${
                isOverdue ? "text-red-600" : "text-green-600"
              }`}
            >
              {isOverdue
                ? `${Math.abs(daysRemaining)} days overdue`
                : `${daysRemaining} days remaining`}
            </p>
          </div>

          {/* Category */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 mb-1">Category</p>
            <p className="text-sm font-semibold text-gray-900">
              {goal.category || "General"}
            </p>
          </div>

          {/* Current Amount */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Current Amount
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(goal.currentAmount)}
            </p>
          </div>

          {/* Target Amount */}
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-xs font-medium text-gray-600 mb-1">
              Target Amount
            </p>
            <p className="text-sm font-semibold text-gray-900">
              {formatCurrency(goal.targetAmount)}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            <span className="text-xs font-medium text-blue-900">
              {percentage === "100.00" ? "Completed" : "In Progress"}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {onAddContribution && (
            <Button
              variant="primary"
              onClick={() => {
                onAddContribution(goal.id);
                onClose();
              }}
              className="flex items-center gap-2"
            >
              <IconPlus size={16} />
              Add Contribution
            </Button>
          )}
          {onEdit && (
            <Button
              variant="primary"
              onClick={() => {
                onEdit(goal);
                onClose();
              }}
              className="flex items-center gap-2"
            >
              <IconEdit size={16} />
              Edit Goal
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
}
