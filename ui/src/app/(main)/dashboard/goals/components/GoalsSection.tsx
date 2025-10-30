"use client";
import { useState } from "react";
import { IGoal, IGoalOption } from "../types/goals";
import IconButton from "@/ui/components/IconButton";
import Button from "@/ui/components/Button";
import TransactionOptionsMenu from "@/ui/components/TransactionOptionsMenu";
import { IconDotsVertical } from "../../../../../../public/icons";
import { IconPlus } from "@tabler/icons-react";

interface GoalsSectionProps {
  goals: IGoal[];
  onGoalClick: (goalId: number) => void;
  onAddContribution: (goalId: number) => void;
  getGoalOptions: (goal: IGoal) => IGoalOption[];
}

export default function GoalsSection({
  goals,
  onGoalClick,
  onAddContribution,
  getGoalOptions,
}: GoalsSectionProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const calculateProgress = (current: number, target: number): string => {
    if (target === 0) return "0.00";
    const progressValue = (current / target) * 100;
    return isNaN(progressValue) ? "0.00" : progressValue.toFixed(2);
  };

  const getProgressPercentageValue = (progressString: string): number => {
    const value = parseFloat(progressString);
    return isNaN(value) ? 0 : value;
  };

  const getRemainingAmount = (current: number, target: number): number => {
    return target - current;
  };

  const isOverdue = (deadline: string): boolean => {
    return new Date(deadline) < new Date();
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="bg-white rounded-xl border border-[var(--color-gray-border)] hover:shadow-md transition-shadow cursor-pointer overflow-hidden"
            onClick={() => onGoalClick(goal.id)}
          >
            {/* Color bar at top */}
            <div className="h-1" style={{ backgroundColor: goal.color }}></div>

            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg"
                    style={{ backgroundColor: goal.color }}
                  >
                    {goal.icon}
                  </div>

                  <div>
                    <h3
                      className="font-semibold text-base"
                      style={{ color: "var(--color-text-black)" }}
                    >
                      {goal.title}
                    </h3>
                    <p
                      className="text-sm"
                      style={{ color: "var(--color-text-gray)" }}
                    >
                      {goal.description}
                    </p>
                  </div>
                </div>

                <div className="relative z-50">
                  <IconButton
                    icon={IconDotsVertical}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuId(openMenuId === goal.id ? null : goal.id);
                    }}
                  />

                  {openMenuId === goal.id && (
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setOpenMenuId(null)}
                    />
                  )}

                  <TransactionOptionsMenu
                    isOpen={openMenuId === goal.id}
                    onClose={() => setOpenMenuId(null)}
                    options={getGoalOptions(goal)}
                  />
                </div>
              </div>

              {/* Amount and Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="text-lg font-bold"
                    style={{ color: "var(--color-text-black)" }}
                  >
                    {formatCurrency(goal.currentAmount)} /{" "}
                    {formatCurrency(goal.targetAmount)}
                  </span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-gray)" }}
                  >
                    {calculateProgress(goal.currentAmount, goal.targetAmount)}%
                  </span>
                </div>

                {/* Progress Bar */}
                <div
                  className="w-full h-2 rounded-full"
                  style={{ backgroundColor: "var(--color-gray-border)" }}
                >
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getProgressPercentageValue(
                        calculateProgress(goal.currentAmount, goal.targetAmount)
                      )}%`,
                      backgroundColor: goal.color,
                    }}
                  ></div>
                </div>
              </div>

              {/* Remaining and Deadline */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-gray)" }}
                  >
                    💰 Remaining
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: "var(--color-text-black)" }}
                  >
                    {formatCurrency(
                      getRemainingAmount(goal.currentAmount, goal.targetAmount)
                    )}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <span
                    className="text-xs"
                    style={{ color: "var(--color-text-gray)" }}
                  >
                    📅 Deadline
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isOverdue(goal.deadline) ? "text-[var(--color-red)]" : ""
                    }`}
                    style={{
                      color: isOverdue(goal.deadline)
                        ? "var(--color-red)"
                        : "var(--color-text-black)",
                    }}
                  >
                    {isOverdue(goal.deadline)
                      ? "Overdue"
                      : new Date(goal.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Add Contribution Button */}
              <Button
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddContribution(goal.id);
                }}
                className="w-full flex items-center justify-center gap-2"
              >
                <IconPlus size={16} />
                Add Contribution
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
