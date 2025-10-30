"use client";
import AnalyticsContent from "./components/AnalyticsContent";
import useAnalytics from "./hooks/useAnalytics";

export default function AnalyticsView(): React.ReactNode {
  const analyticsData = useAnalytics();

  return <AnalyticsContent analyticsData={analyticsData} />;
}
