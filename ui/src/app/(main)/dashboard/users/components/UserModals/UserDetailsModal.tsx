"use client";
import { useState } from "react";
import Modal from "@/ui/components/Modal";
import { IUserUI } from "../../types/user";

interface IUserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: IUserUI | null;
  onViewImage?: (imageUrl: string) => void;
}

export default function UserDetailsModal({
  isOpen,
  onClose,
  user,
  onViewImage,
}: IUserDetailsModalProps): React.ReactNode {
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  if (!user) return null;

  const handleImageError = (userId: number) => {
    setBrokenImages((prev) => new Set(prev).add(userId));
  };

  const getInitials = (fullName: string): string => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  // Map role_id to role name
  const getRoleName = (roleId: number): string => {
    const roles: { [key: number]: string } = {
      1: "user",
      2: "admin",
    };
    return roles[roleId] || "unknown";
  };

  // Map plan_id to plan name
  const getPlanName = (planId?: number): string => {
    const plans: { [key: number]: string } = {
      1: "Free",
      2: "Premium",
      3: "Enterprise",
    };
    return plans[planId || 1] || "Free";
  };

  // Map provider_id to provider name
  const getProviderName = (providerId: number): string => {
    const providers: { [key: number]: string } = {
      1: "email",
      2: "google",
      3: "github",
    };
    return providers[providerId] || "unknown";
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="User Details" size="lg">
      <div className="p-6 space-y-6">
        {/* Profile Section */}
        <div className="flex items-center space-x-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium text-white bg-[var(--color-blue)] overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() =>
              user.profile_picture &&
              !brokenImages.has(user.id) &&
              onViewImage?.(user.profile_picture)
            }
          >
            {user.profile_picture && !brokenImages.has(user.id) ? (
              <img
                src={user.profile_picture}
                alt={user.fullName}
                className="w-full h-full object-cover"
                onError={() => handleImageError(user.id)}
              />
            ) : (
              getInitials(user.fullName)
            )}
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--color-text-black)]">
              {user.fullName}
            </h3>
            <p className="text-sm text-[var(--color-text-gray)]">
              {user.email}
            </p>
            {user.profile_picture && !brokenImages.has(user.id) && (
              <p className="text-xs text-[var(--color-text-gray)] mt-1">
                Click image to view
              </p>
            )}
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-6">
          {/* Email */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Email
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {user.email}
            </p>
          </div>

          {/* Phone */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Phone
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {user.phone_number}
            </p>
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Address
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {user.address}
            </p>
          </div>

          {/* Join Date */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Join Date
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {formatDate(user.join_date)}
            </p>
          </div>

          {/* Role */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Role
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1 capitalize">
              {getRoleName(user.role_id)}
            </p>
          </div>

          {/* Plan */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Plan
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {getPlanName(user.plan_id)}
            </p>
          </div>

          {/* Provider */}
          <div>
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Provider
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1 capitalize">
              {getProviderName(user.provider_id)}
            </p>
          </div>

          {/* Bio */}
          <div className="col-span-2">
            <label className="text-xs font-medium text-[var(--color-text-gray)] uppercase">
              Bio
            </label>
            <p className="text-sm text-[var(--color-text-black)] mt-1">
              {user.bio || "No bio provided"}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
