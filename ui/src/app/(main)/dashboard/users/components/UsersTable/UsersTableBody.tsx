"use client";
import { useState } from "react";
import { IconEye, IconEdit, IconTrash } from "@tabler/icons-react";
import { IconDotsVertical } from "../../../../../../../public/icons";
import { IUserUI } from "../../types/user";
import IconButton from "@/ui/components/IconButton";

interface IUsersTableBodyProps {
  users: IUserUI[];
  onUserClick?: (userId: number) => void;
  onEditUser?: (userId: number) => void;
  onDeleteUser?: (userId: number) => void;
  onViewDetails?: (userId: number) => void;
}

export default function UsersTableBody({
  users,
  onUserClick,
  onEditUser,
  onDeleteUser,
  onViewDetails,
}: IUsersTableBodyProps): React.ReactNode {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Set<number>>(new Set());

  const handleMenuClick = (e: React.MouseEvent, userId: number) => {
    e.stopPropagation();
    setOpenMenuId(openMenuId === userId ? null : userId);
  };

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
    setOpenMenuId(null);
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  const getInitials = (fullName: string): string => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  const handleImageError = (userId: number) => {
    setBrokenImages((prev) => new Set(prev).add(userId));
  };

  const getRoleName = (roleId: number): string => {
    const roles: Record<number, string> = {
      1: "user",
      2: "admin",
    };
    return roles[roleId] || "unknown";
  };

  const getPlanName = (planId?: number): string => {
    const plans: Record<number, string> = {
      1: "Free",
      2: "Premium",
      3: "Enterprise",
    };
    return plans[planId || 1] || "Free";
  };

  const getProviderName = (providerId: number): string => {
    const providers: Record<number, string> = {
      1: "email",
      2: "google",
      3: "github",
    };
    return providers[providerId] || "unknown";
  };

  const getRoleBadgeColor = (roleId: number): string =>
    roleId === 2 ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800";

  const getPlanBadgeColor = (planId?: number): string => {
    const plan = planId || 1;
    if (plan === 3) return "bg-purple-100 text-purple-800";
    if (plan === 2) return "bg-green-100 text-green-800";
    return "bg-gray-100 text-gray-800";
  };

  const getProviderBadgeColor = (providerId: number): string => {
    if (providerId === 2) return "bg-blue-100 text-blue-800";
    if (providerId === 3) return "bg-gray-100 text-gray-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px] divide-y divide-[var(--color-gray-border)]">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => onUserClick?.(user.id)}
            className="px-8 py-4 hover:bg-[var(--color-gray-light)] cursor-pointer transition-colors duration-200 relative border-b border-[var(--color-gray-border)]"
          >
            {/* 🧩 MISMA ESTRUCTURA QUE EL HEADER */}
            <div className="grid grid-cols-8 gap-8 items-center w-full">
              {/* User */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white bg-[var(--color-blue)] overflow-hidden shrink-0">
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
                <div className="min-w-0">
                  <p className="font-medium text-[var(--color-text-black)] truncate">
                    {user.fullName}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {user.address}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="text-sm text-gray-500 truncate">{user.email}</div>

              {/* Phone */}
              <div className="text-sm text-gray-500 truncate">
                {user.phone_number}
              </div>

              {/* Join Date */}
              <div className="text-sm text-gray-500">
                {formatDate(user.join_date)}
              </div>

              {/* Role */}
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getRoleBadgeColor(
                    user.role_id
                  )}`}
                >
                  {getRoleName(user.role_id)}
                </span>
              </div>

              {/* Plan */}
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getPlanBadgeColor(
                    user.plan_id
                  )}`}
                >
                  {getPlanName(user.plan_id)}
                </span>
              </div>

              {/* Provider */}
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getProviderBadgeColor(
                    user.provider_id
                  )}`}
                >
                  {getProviderName(user.provider_id)}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-end relative">
                <IconButton
                  icon={IconDotsVertical}
                  variant="ghost"
                  size="sm"
                  onClick={(e) => handleMenuClick(e, user.id)}
                />
                {openMenuId === user.id && (
                  <div className="absolute right-0 top-full mt-1 bg-white border border-[var(--color-gray-border)] rounded-lg shadow-lg z-10 min-w-[150px]">
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onViewDetails?.(user.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-gray-light)] flex items-center gap-2 border-b"
                    >
                      <IconEye className="w-4 h-4" /> View
                    </button>
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onEditUser?.(user.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-gray-light)] flex items-center gap-2 border-b"
                    >
                      <IconEdit className="w-4 h-4" /> Edit
                    </button>
                    <button
                      onClick={(e) =>
                        handleAction(e, () => onDeleteUser?.(user.id))
                      }
                      className="w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-red-50 flex items-center gap-2"
                    >
                      <IconTrash className="w-4 h-4" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
