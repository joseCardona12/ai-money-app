import {
  IconPlus,
  IconArrowUpRight,
  IconTarget,
  IconAlertTriangle,
  IconBulb,
} from "@tabler/icons-react";

export const STATS_CARDS = [
  {
    title: "Total balance",
    amount: "$0.00",
    currency: "USD",
    change: "0%",
    changeText: "No transactions yet",
    positive: false,
  },
  {
    title: "Income",
    amount: "$0.00",
    currency: "USD",
    change: "0%",
    changeText: "No income recorded",
    positive: false,
  },
  {
    title: "Expenses",
    amount: "$0.00",
    currency: "USD",
    change: "0%",
    changeText: "No expenses recorded",
    positive: false,
  },
];

export const CHART_DATA = [
  { month: "Jan", budget: 0, expense: 0 },
  { month: "Feb", budget: 0, expense: 0 },
  { month: "Mar", budget: 0, expense: 0 },
  { month: "Apr", budget: 0, expense: 0 },
  { month: "May", budget: 0, expense: 0 },
  { month: "Jun", budget: 0, expense: 0 },
  { month: "Jul", budget: 0, expense: 0 },
  { month: "Aug", budget: 0, expense: 0 },
  { month: "Sep", budget: 0, expense: 0 },
  { month: "Oct", budget: 0, expense: 0 },
  { month: "Nov", budget: 0, expense: 0 },
  { month: "Dec", budget: 0, expense: 0 },
];

export const TRANSACTIONS_DATA: any[] = [];

export const ALERTS_DATA: any[] = [];

export const QUICK_ACTIONS_DATA = [
  {
    id: 1,
    title: "Add Income",
    icon: IconPlus,
    color: "var(--color-green)",
    bgColor: "var(--color-green-light)",
  },
  {
    id: 2,
    title: "Add Expense",
    icon: IconArrowUpRight,
    color: "var(--color-red)",
    bgColor: "var(--color-red-light)",
  },
  {
    id: 3,
    title: "Transfer",
    icon: IconArrowUpRight,
    color: "var(--color-blue)",
    bgColor: "var(--color-blue-light)",
  },
  {
    id: 4,
    title: "New Goal",
    icon: IconTarget,
    color: "var(--color-purple)",
    bgColor: "var(--color-purple-light)",
  },
];

export const CHART_CONFIG = {
  maxValue: 800,
  height: 192, // h-48 in pixels
};
