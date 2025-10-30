"use client";
import { ReactNode } from "react";
import DashboardSidebar from "./DashboardSidebar";
import DashboardHeader from "./DashboardHeader";
import useDashboardLayout from "../hooks/useDashboardLayout";
import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: DashboardLayoutProps): React.ReactNode {
  const layoutData = useDashboardLayout();

  return (
    <ProtectedRoute>
      <div
        className="flex h-screen"
        style={{ backgroundColor: "var(--color-gray)" }}
      >
        {/* Sidebar */}
        <DashboardSidebar
          onMenuItemClick={layoutData.handleMenuItemClick}
          onToggleDarkMode={layoutData.toggleDarkMode}
          isDarkMode={layoutData.isDarkMode}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <DashboardHeader
            userData={layoutData.userData}
            onRefresh={layoutData.refreshData}
            isLoading={layoutData.isLoading}
          />

          {/* Content */}
          <div
            className="flex-1 overflow-auto"
            style={{ backgroundColor: "var(--color-gray)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
