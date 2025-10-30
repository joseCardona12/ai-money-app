import { IOnboardingFormData } from "@/interfaces/onboarding";
import { Control, FieldErrors, Controller } from "react-hook-form";
import { IGoalType } from "@/interfaces/goalType";

interface IStep2FinancialGoalsProps {
  control: Control<IOnboardingFormData>;
  errors: FieldErrors<IOnboardingFormData>;
  goalTypes: IGoalType[];
}

export default function Step2FinancialGoals({
  control,
  errors,
  goalTypes = [],
}: IStep2FinancialGoalsProps): React.ReactNode {
  return (
    <div className="w-full max-w-full">
      <div>
        <Controller
          name="goal_type_id"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              {goalTypes && goalTypes.length > 0 ? (
                goalTypes.map((goal: IGoalType) => {
                  const goalId = goal.id?.toString() || "0";
                  const isSelected = field.value === goalId;

                  return (
                    <label
                      key={goal.id}
                      className={`w-full flex items-start gap-3 border rounded-lg p-3 cursor-pointer transition-colors ${
                        isSelected ? "selected-goal" : "unselected-goal"
                      }`}
                      style={{
                        borderColor: isSelected
                          ? "var(--color-blue)"
                          : "var(--color-gray-border)",
                        backgroundColor: isSelected
                          ? "var(--color-blue-light)"
                          : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-gray-hover)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isSelected) {
                          e.currentTarget.style.backgroundColor = "transparent";
                        }
                      }}
                    >
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => {
                          field.onChange(goalId);
                        }}
                        className="w-4 h-4 mt-0.5 rounded-full flex-shrink-0"
                        style={{
                          accentColor: "var(--color-blue)",
                          borderColor: "var(--color-gray-border)",
                        }}
                      />
                      <div className="flex flex-col gap-0">
                        <h6
                          className="font-medium text-sm"
                          style={{ color: "var(--color-text-black)" }}
                        >
                          {goal.name}
                        </h6>
                        <p
                          className="text-xs mt-0.5 break-words"
                          style={{ color: "var(--color-text-gray)" }}
                        >
                          {goal.description}
                        </p>
                      </div>
                    </label>
                  );
                })
              ) : (
                <p className="text-sm text-[var(--color-text-gray)]">
                  Loading goal types...
                </p>
              )}
            </div>
          )}
        />
        {errors.goal_type_id && (
          <p className="text-sm mt-2" style={{ color: "var(--color-red)" }}>
            {errors.goal_type_id.message}
          </p>
        )}
      </div>
    </div>
  );
}
