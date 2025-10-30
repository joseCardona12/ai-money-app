"use client";
import OverallProgressSection from "./OverallProgressSection";
import GoalsSection from "./GoalsSection";
import AddGoalModal from "./GoalModals/AddGoalModal";
import AddContributionModal from "./GoalModals/AddContributionModal";
import GoalDetailsModal from "./GoalModals/GoalDetailsModal";
import ConfirmationModal from "@/ui/components/ConfirmationModal";
import Button from "@/ui/components/Button";
import { IconPlus } from "@tabler/icons-react";
import { IUseGoals } from "../hooks/useGoals";
import GoalCardSkeleton from "./Skeletons/GoalCardSkeleton";
import OverallProgressSkeleton from "./Skeletons/OverallProgressSkeleton";

interface GoalsContentProps {
  goalsData: IUseGoals;
}

export default function GoalsContent({
  goalsData,
}: GoalsContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-6">
      {/* Header with title and Add Goal button */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold"
            style={{ color: "var(--color-text-black)" }}
          >
            Financial Goals
          </h1>
          <p
            className="text-sm mt-1"
            style={{ color: "var(--color-text-gray)" }}
          >
            Track and achieve your financial objectives
          </p>
        </div>
        <Button
          variant="primary"
          onClick={goalsData.handleAddGoal}
          disabled={goalsData.isLoading || goalsData.isSubmitting}
          className="flex items-center gap-2"
        >
          <IconPlus size={16} />
          {goalsData.isSubmitting ? "Creating..." : "Add Goal"}
        </Button>
      </div>

      {goalsData.isLoading ? (
        <OverallProgressSkeleton />
      ) : (
        <OverallProgressSection progress={goalsData.overallProgress} />
      )}

      {goalsData.isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <GoalCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <GoalsSection
          goals={goalsData.goals}
          onGoalClick={goalsData.handleGoalClick}
          onAddContribution={goalsData.handleAddContribution}
          getGoalOptions={goalsData.getGoalOptions}
        />
      )}

      <AddGoalModal
        isOpen={goalsData.modal.isOpen}
        onClose={goalsData.closeModal}
        mode={goalsData.modal.mode}
        goal={goalsData.modal.selectedGoal}
        onSubmit={goalsData.handleModalSubmit}
      />

      <AddContributionModal
        isOpen={goalsData.contributionModal.isOpen}
        onClose={goalsData.closeContributionModal}
        goal={goalsData.contributionModal.selectedGoal || null}
        onSubmit={goalsData.handleContributionSubmit}
        isSubmitting={goalsData.isSubmitting}
      />

      <GoalDetailsModal
        isOpen={goalsData.detailsModal.isOpen}
        onClose={goalsData.closeDetailsModal}
        goal={goalsData.detailsModal.selectedGoal || null}
        onEdit={(goal) => {
          goalsData.closeDetailsModal();
          goalsData.openEditModal(goal);
        }}
        onAddContribution={(goalId) => {
          goalsData.closeDetailsModal();
          goalsData.handleAddContribution(goalId);
        }}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={goalsData.deleteConfirmationModal.isOpen}
        onClose={goalsData.closeDeleteConfirmation}
        title="Delete Goal"
        message="Are you sure you want to delete this goal? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={goalsData.handleConfirmDelete}
        isLoading={goalsData.isDeleting}
        variant="danger"
      />
    </div>
  );
}
