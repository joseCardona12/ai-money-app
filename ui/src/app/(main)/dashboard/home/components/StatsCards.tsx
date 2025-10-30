"use client";
import { IconTrendingUp } from "@tabler/icons-react";
import { STATS_CARDS } from "../utils/constants/dashboardData";
import Card from "@/ui/components/Card";

interface StatsCardsProps {
  statsCards: typeof STATS_CARDS;
}

export default function StatsCards({
  statsCards,
}: StatsCardsProps): React.ReactNode {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {statsCards.map((stat, index) => (
        <Card
          key={index}
          title={stat.title}
          amount={stat.amount}
          currency={stat.currency}
          change={stat.change}
          changeText={stat.changeText}
          positive={stat.positive}
          selects={[
            { value: "USD", label: "USD" },
            { value: "COL", label: "COL" },
          ]}
        />
      ))}
    </div>
  );
}
