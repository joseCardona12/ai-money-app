import { ReactElement } from "react";

export interface IMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active: boolean;
  href: string;
}

export interface IBottomMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  isToggle?: boolean;
}

export interface IStatCard {
  title: string;
  amount: string;
  currency: string;
  change: string;
  changeText: string;
  positive: boolean;
}

export interface IChartData {
  month: string;
  budget: number;
  expense: number;
}

export interface ITransaction {
  id: number;
  name: string;
  date: string;
  amount: string;
  icon: string;
  color: string;
}

export interface IAlert {
  id: number;
  type: string;
  icon: React.ComponentType<{ className?: string }>;
  message: string;
  color: string;
}

export interface IQuickAction {
  id: number;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
}

export interface IUserData {
  name: string;
  email: string;
  initials: string;
  notificationCount: number;
}
