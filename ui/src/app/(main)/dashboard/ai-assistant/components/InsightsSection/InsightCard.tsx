"use client";
import { IconChevronRight } from "@tabler/icons-react";
import { IInsightCard } from "../../types/aiAssistant";

interface InsightCardProps {
  insight: IInsightCard;
  onActionClick?: (insight: IInsightCard) => void;
}

export default function InsightCard({
  insight,
  onActionClick,
}: InsightCardProps): React.ReactNode {
  const getColorClasses = (color: string, type: string) => {
    if (type === "alert") {
      return {
        bg: "bg-orange-50",
        border: "border-orange-200",
        icon: "bg-orange-100 text-orange-600",
        text: "text-orange-800",
      };
    }
    
    if (type === "opportunity") {
      return {
        bg: "bg-yellow-50",
        border: "border-yellow-200",
        icon: "bg-yellow-100 text-yellow-600",
        text: "text-yellow-800",
      };
    }
    
    if (type === "progress") {
      return {
        bg: "bg-green-50",
        border: "border-green-200",
        icon: "bg-green-100 text-green-600",
        text: "text-green-800",
      };
    }

    return {
      bg: "bg-gray-50",
      border: "border-gray-200",
      icon: "bg-gray-100 text-gray-600",
      text: "text-gray-800",
    };
  };

  const colorClasses = getColorClasses(insight.color, insight.type);

  const handleActionClick = () => {
    if (onActionClick) {
      onActionClick(insight);
    }
  };

  return (
    <div
      className={`p-4 rounded-lg border ${colorClasses.bg} ${colorClasses.border}`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClasses.icon}`}
        >
          <span className="text-sm">{insight.icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`font-medium text-sm mb-1 ${colorClasses.text}`}>
            {insight.title}
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            {insight.description}
          </p>

          {insight.actionText && (
            <button
              onClick={handleActionClick}
              className={`flex items-center gap-1 mt-2 text-xs font-medium ${colorClasses.text} hover:underline`}
            >
              {insight.actionText}
              <IconChevronRight size={12} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

