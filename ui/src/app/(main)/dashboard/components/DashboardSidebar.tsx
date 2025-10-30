"use client";
import { usePathname } from "next/navigation";
import Logo from "@/ui/components/Logo";
import {
  MENU_ITEMS,
  BOTTOM_MENU_ITEMS,
  MENU_ITEMS_ADMIN,
} from "../utils/constants/menuItems";
import useAuthListener from "../hooks/useAuthListener";

interface DashboardSidebarProps {
  onMenuItemClick: (href: string) => void;
  onToggleDarkMode: () => void;
  isDarkMode: boolean;
}

export default function DashboardSidebar({
  onMenuItemClick,
  onToggleDarkMode,
  isDarkMode,
}: DashboardSidebarProps): React.ReactNode {
  const { user } = useAuthListener();
  const pathname = usePathname();
  const VERIFY_MENU_ITEMS = user?.role_id === 1 ? MENU_ITEMS : MENU_ITEMS_ADMIN;
  return (
    <div
      className="w-64 h-full flex flex-col border-r-1 border-[var(--color-gray-border)]"
      style={{ backgroundColor: "var(--color-white)" }}
    >
      <div className="p-[22px] border-b-1 border-[var(--color-gray-border)]">
        <Logo text="ai money" />
      </div>
      <div className="flex-1 p-4">
        <nav className="space-y-2">
          {VERIFY_MENU_ITEMS.map((item, index) => {
            const isActive = pathname === item.href;
            return (
              <button
                key={index}
                onClick={() => onMenuItemClick(item.href)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 cursor-pointer"
                style={{
                  color: isActive
                    ? "var(--color-text-black)"
                    : "var(--color-text-gray)",
                  backgroundColor: isActive
                    ? "var(--color-gray-3)"
                    : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor =
                      "var(--color-gray-2)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Items */}
      <div
        className="p-4 border-t"
        style={{ borderColor: "var(--color-gray)" }}
      >
        <div className="space-y-2">
          {BOTTOM_MENU_ITEMS.map((item, index) => (
            <button
              key={index}
              onClick={() =>
                item.isToggle ? onToggleDarkMode() : onMenuItemClick(item.href)
              }
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer"
              style={{ color: "var(--color-text-gray)" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-gray-2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
