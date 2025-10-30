import {
  IconDashboard,
  IconTransfer,
  IconWallet,
  IconTarget,
  IconChartBar,
  IconChartPie,
  IconRobot,
  IconSettings,
  IconHelp,
  IconLogout,
  IconMoon,
  IconUser,
  IconUsers,
  IconBrandGoogle,
  IconCreditCard,
  IconTag,
  IconShield,
  IconReceipt,
  IconWorld,
  IconCoin,
} from "@tabler/icons-react";

interface IMenuItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

export const MENU_ITEMS: IMenuItem[] = [
  { icon: IconDashboard, label: "Dashboard", href: "/dashboard/home" },
  {
    icon: IconTransfer,
    label: "Transactions",
    href: "/dashboard/transactions",
  },
  { icon: IconWallet, label: "Wallet", href: "/dashboard/wallet" },
  { icon: IconTarget, label: "Goals", href: "/dashboard/goals" },
  { icon: IconChartBar, label: "Budget", href: "/dashboard/budget" },
  { icon: IconChartPie, label: "Analytics", href: "/dashboard/analytics" },
  { icon: IconRobot, label: "AI Assistant", href: "/dashboard/ai-assistant" },
  { icon: IconUser, label: "My Account", href: "/dashboard/myaccount" },
  { icon: IconSettings, label: "Settings", href: "/dashboard/settings" },
];

export const MENU_ITEMS_ADMIN: IMenuItem[] = [
  {
    icon: IconDashboard,
    label: "Summary",
    href: "/dashboard/summary",
  },
  {
    icon: IconUsers,
    label: "Users",
    href: "/dashboard/users",
  },
  {
    icon: IconBrandGoogle,
    label: "Providers",
    href: "/dashboard/providers",
  },
  {
    icon: IconWallet,
    label: "Accounts",
    href: "/dashboard/accounts",
  },
  {
    icon: IconCreditCard,
    label: "Account Types",
    href: "/dashboard/account-types",
  },
  {
    icon: IconShield,
    label: "Roles",
    href: "/dashboard/roles",
  },
  {
    icon: IconReceipt,
    label: "Transactions",
    href: "/dashboard/transaction-types",
  },
  {
    icon: IconWorld,
    label: "States",
    href: "/dashboard/states",
  },
  {
    icon: IconCoin,
    label: "Currencies",
    href: "/dashboard/currencies",
  },
];

export const BOTTOM_MENU_ITEMS = [
  { icon: IconHelp, label: "Help", href: "/help" },
  { icon: IconLogout, label: "Log out", href: "/logout" },
  { icon: IconMoon, label: "Dark Mode", href: "#", isToggle: true },
];
