"use client";
import { IconTrendingUp, IconTrendingDown } from "@tabler/icons-react";
import { IAnalyticsCard } from "../types/analytics";

interface AnalyticsStatsCardsProps {
  cards: IAnalyticsCard[];
}

export default function AnalyticsStatsCards({
  cards,
}: AnalyticsStatsCardsProps): React.ReactNode {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <div
          key={card.id}
          className="p-4 rounded-xl border border-[var(--color-gray-border)] bg-white"
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-medium text-[var(--color-text-gray)]">
              {card.title}
            </h3>
            {card.changeType !== "neutral" && (
              <div
                className={`p-2 rounded-lg ${
                  card.changeType === "positive"
                    ? "bg-[var(--color-green-light)]"
                    : "bg-[var(--color-red-light)]"
                }`}
              >
                {card.changeType === "positive" ? (
                  <IconTrendingUp
                    size={16}
                    style={{ color: "var(--color-green)" }}
                  />
                ) : (
                  <IconTrendingDown
                    size={16}
                    style={{ color: "var(--color-red)" }}
                  />
                )}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <p className="text-xl font-semibold text-[var(--color-text-black)]">
              {card.value}
            </p>
            <div className="flex items-center space-x-2">
              <span
                className={`text-sm font-medium ${
                  card.changeType === "positive"
                    ? "text-[var(--color-green)]"
                    : card.changeType === "negative"
                    ? "text-[var(--color-red)]"
                    : "text-[var(--color-text-gray)]"
                }`}
              >
                {card.changeType === "positive" && "↗ "}
                {card.changeType === "negative" && "↘ "}
                {card.change}
              </span>
              {card.changeType !== "neutral" && (
                <span className="text-sm text-[var(--color-text-gray)]">
                  {card.changeType === "positive" ? "increase" : "decrease"}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
