"use client";
import { IMyAccountContentProps } from "../types/myaccount";
import TitleContent from "@/ui/components/TitleContent";
import ProfilePicture from "./ProfileSection/ProfilePicture";
import PersonalInformation from "./ProfileSection/PersonalInformation";
import AccountStatistics from "./ActivitySection/AccountStatistics";
import RecentActivity from "./ActivitySection/RecentActivity";
import ConnectedAccounts from "./AccountsSection/ConnectedAccounts";

export default function MyAccountContent({
  myAccountData,
}: IMyAccountContentProps): React.ReactNode {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <TitleContent
        title="Profile"
        description="Manage your personal information and preferences"
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Picture */}
        <div className="lg:col-span-1">
          <ProfilePicture
            profilePicture={myAccountData.profilePicture}
            personalInformation={myAccountData.personalInformation}
            onUpload={myAccountData.uploadProfilePicture}
            isLoading={myAccountData.isLoading}
            PLAN={myAccountData.PLAN}
          />
        </div>

        {/* Right Column - Personal Information */}
        <div className="lg:col-span-2">
          <PersonalInformation
            personalInformation={myAccountData.personalInformation}
          />
        </div>
      </div>

      {/* Account Statistics */}
      <AccountStatistics accountStatistics={myAccountData.accountStatistics} />

      {/* Recent Activity and Connected Accounts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity recentActivity={myAccountData.recentActivity} />

        {/* Connected Accounts */}
        <ConnectedAccounts
          connectedAccounts={myAccountData.connectedAccounts}
          onDisconnect={myAccountData.disconnectAccount}
          isLoading={myAccountData.isLoading}
        />
      </div>
    </div>
  );
}
