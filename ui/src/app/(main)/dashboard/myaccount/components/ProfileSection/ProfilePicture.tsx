"use client";
import { IProfilePicture, IPersonalInformation } from "../../types/myaccount";
import { IconCamera } from "@tabler/icons-react";
import { useRef } from "react";

interface ProfilePictureProps {
  profilePicture: IProfilePicture;
  personalInformation: IPersonalInformation;
  onUpload: (file: File) => Promise<void>;
  isLoading: boolean;
  PLAN: string;
}

export default function ProfilePicture({
  profilePicture,
  personalInformation,
  onUpload,
  isLoading,
  PLAN,
}: ProfilePictureProps): React.ReactNode {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      await onUpload(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className={`bg-white rounded-xl border border-[var(--color-gray-border)] p-6 transition-opacity duration-300 ${
        isLoading ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <h3 className="text-lg font-semibold mb-4 text-[var(--color-text-primary)]">
        Profile Picture
      </h3>
      <p className="text-sm text-[var(--color-text-gray)] mb-6">
        Update your profile photo
      </p>

      <div className="flex flex-col items-center gap-6">
        {/* Profile Picture */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
            {profilePicture.url ? (
              <img
                src={profilePicture.url}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-4xl font-bold text-white">
                {profilePicture.initials}
              </span>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUploadClick}
            disabled={isLoading}
            className="absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full p-3 shadow-lg transition-colors cursor-pointer"
          >
            <IconCamera className="w-5 h-5" />
          </button>
        </div>

        {/* User Info */}
        <div className="text-center">
          <h4 className="text-xl font-bold text-[var(--color-text-primary)]">
            {personalInformation.fullName}
          </h4>
          <p className="text-sm text-[var(--color-text-gray)]">
            {personalInformation.email}
          </p>
          <p className="text-xs text-[var(--color-text-gray)] mt-1">
            Plan: {PLAN}
          </p>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
}

