"use client";
import { IInsightCard } from "../../types/aiAssistant";
import InsightCard from "./InsightCard";

interface AIInsightsPanelProps {
  insights: IInsightCard[];
}

export default function AIInsightsPanel({
  insights,
}: AIInsightsPanelProps): React.ReactNode {
  const handleInsightAction = (insight: IInsightCard) => {
    console.log("Insight action clicked:", insight);
    // TODO: Implement insight action handling
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-1">
          AI Insights
        </h3>
        <p className="text-sm text-[var(--color-text-gray)]">
          Personalized recommendations for you
        </p>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => (
          <InsightCard
            key={insight.id}
            insight={insight}
            onActionClick={handleInsightAction}
          />
        ))}
      </div>
    </div>
  );
}

