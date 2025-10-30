"use client";
import { useState } from "react";
import {
  ANALYTICS_CARDS,
  INCOME_VS_EXPENSES_DATA,
  SAVINGS_TREND_DATA,
  CATEGORY_SPENDING_DATA,
  CATEGORY_BREAKDOWN_DATA,
  CASH_FLOW_DATA,
  TIME_PERIODS,
} from "../utils/constants/analyticsData";
import { IUseAnalytics, AnalyticsTab } from "../types/analytics";
import { IContentTab } from "@/interfaces/contentTab";

export default function useAnalytics(): IUseAnalytics {
  const [selectedPeriod, setSelectedPeriod] =
    useState<string>("last-12-months");
  const [activeTab, setActiveTab] = useState<AnalyticsTab>("overview");

  // ContentTab format for Analytics
  const ANALYTICS_CONTENT_TABS: IContentTab[] = [
    {
      active: true,
      icon: <span></span>,
      tab_key: "overview",
      text: "Overview",
    },
    {
      active: false,
      icon: <span></span>,
      tab_key: "categories",
      text: "Categories",
    },
    {
      active: false,
      icon: <span></span>,
      tab_key: "cashflow",
      text: "Cash Flow",
    },
  ];

  const [contentTabs, setContentTabs] = useState<IContentTab[]>(
    ANALYTICS_CONTENT_TABS
  );

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log("Period changed to:", period);
    // Aquí se podría hacer una llamada a la API para obtener datos del período seleccionado
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab as AnalyticsTab);
    console.log("Tab changed to:", tab);
    // Update content tabs
    const updatedTabs = contentTabs.map((contentTab: IContentTab) => ({
      ...contentTab,
      active: contentTab.tab_key === tab,
    }));
    setContentTabs(updatedTabs);
  };

  return {
    // Data
    cards: ANALYTICS_CARDS,
    incomeVsExpenses: INCOME_VS_EXPENSES_DATA,
    savingsTrend: SAVINGS_TREND_DATA,
    categorySpending: CATEGORY_SPENDING_DATA,
    categoryBreakdown: CATEGORY_BREAKDOWN_DATA,
    cashFlowAnalysis: CASH_FLOW_DATA,
    selectedPeriod,
    activeTab,
    contentTabs,

    // Actions
    handlePeriodChange,
    handleTabChange,
    setContentTabs,
  };
}
