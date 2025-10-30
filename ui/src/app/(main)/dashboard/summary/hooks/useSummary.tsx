"use client";
import { useState, useEffect } from "react";
import { userService } from "@/services/user";
import { accountService } from "@/services/account";
import { toast } from "sonner";

interface ISummaryData {
  totalUsers: number;
  totalAccounts: number;
  totalProviders: number;
  emailProviders: number;
  googleProviders: number;
  githubProviders: number;
  isLoading: boolean;
}

export const useSummary = (): ISummaryData => {
  const [data, setData] = useState<ISummaryData>({
    totalUsers: 0,
    totalAccounts: 0,
    totalProviders: 0,
    emailProviders: 0,
    googleProviders: 0,
    githubProviders: 0,
    isLoading: true,
  });

  useEffect(() => {
    const loadSummaryData = async () => {
      try {
        setData((prev) => ({ ...prev, isLoading: true }));

        // Load users
        const usersResponse = await userService.getAllUsers();
        const users = Array.isArray(usersResponse.data)
          ? usersResponse.data
          : [];

        // Load accounts
        const accountsResponse = await accountService.getAllAccounts();
        const accounts = Array.isArray(accountsResponse.data)
          ? accountsResponse.data
          : [];

        // Calculate provider distribution
        const emailCount = users.filter((u) => u.provider_id === 1).length;
        const googleCount = users.filter((u) => u.provider_id === 2).length;
        const githubCount = users.filter((u) => u.provider_id === 3).length;

        setData({
          totalUsers: users.length,
          totalAccounts: accounts.length,
          totalProviders: users.length > 0 ? 3 : 0, // Email, Google, GitHub
          emailProviders: emailCount,
          googleProviders: googleCount,
          githubProviders: githubCount,
          isLoading: false,
        });
      } catch (error) {
        console.error("Error loading summary data:", error);
        toast.error("Failed to load summary data");
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    loadSummaryData();
  }, []);

  return data;
};

