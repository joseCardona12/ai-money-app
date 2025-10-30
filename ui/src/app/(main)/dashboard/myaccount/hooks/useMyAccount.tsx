"use client";
import { useState, useEffect } from "react";
import {
  IUseMyAccount,
  IPersonalInformation,
  IProfilePicture,
} from "../types/myaccount";
import {
  DEFAULT_PROFILE_PICTURE,
  DEFAULT_ACCOUNT_STATISTICS,
  DEFAULT_RECENT_ACTIVITY,
  DEFAULT_CONNECTED_ACCOUNTS,
} from "../utils/constants/myaccountData";
import useAuthListener from "../../hooks/useAuthListener";
import { CURRENT_PERSONAL_INFORMATION } from "../utils/constants/personalInformation";
import { getPlan } from "../utils/getPlan";
import useUploadProfilePicture from "./useUploadProfilePicture";

export default function useMyAccount(): IUseMyAccount {
  const { user } = useAuthListener();
  const [profilePicture, setProfilePicture] = useState<IProfilePicture>(
    DEFAULT_PROFILE_PICTURE
  );
  const [personalInformation, setPersonalInformation] =
    useState<IPersonalInformation>(CURRENT_PERSONAL_INFORMATION);
  const [isSaving] = useState(false);
  const PLAN = getPlan(user?.plan_id || 1);
  const { handleUploadProfilePicture, loading: uploadLoading } =
    useUploadProfilePicture();

  // Update state when user data changes
  useEffect(() => {
    if (user) {
      // Update personal information
      setPersonalInformation({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phone_number || "",
        location: user.address || "",
        bio: user.bio || "",
      });

      // Update profile picture
      const initials = user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      setProfilePicture({
        url: user.profile_picture || DEFAULT_PROFILE_PICTURE.url,
        initials: initials || "U",
      });
    }
  }, [user]);

  const saveProfile = async (): Promise<void> => {
    // TODO: Implement API call to save profile
  };

  const uploadProfilePicture = async (file: File): Promise<void> => {
    await handleUploadProfilePicture(file);
  };

  const disconnectAccount = async (accountId: string): Promise<void> => {
    // TODO: Implement API call to disconnect account
  };

  return {
    // State
    profilePicture,
    personalInformation,
    accountStatistics: {
      ...DEFAULT_ACCOUNT_STATISTICS,
      memberSince:
        new Date(user?.join_date).toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }) || "Jan 2023",
    },
    recentActivity: DEFAULT_RECENT_ACTIVITY,
    connectedAccounts: DEFAULT_CONNECTED_ACCOUNTS,
    isLoading: uploadLoading,
    isSaving,
    saveProfile,
    uploadProfilePicture,
    disconnectAccount,
    PLAN,
  };
}
