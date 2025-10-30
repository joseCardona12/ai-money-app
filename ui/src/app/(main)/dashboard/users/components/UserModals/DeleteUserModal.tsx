"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import { IconAlertTriangle } from "@tabler/icons-react";
import { IUserUI } from "../../types/user";

interface IDeleteUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
  user?: IUserUI | null;
}

export default function DeleteUserModal({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  user,
}: IDeleteUserModalProps): React.ReactNode {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete User" size="md">
      <div className="p-6 space-y-6">
        {/* Warning Icon and Message */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
            <IconAlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[var(--color-text-black)] mb-2">
              Delete User
            </h3>
            <p className="text-sm text-[var(--color-text-gray)]">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-[var(--color-text-black)]">
                {user?.fullName}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
        </div>

        {/* User Details */}
        {user && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--color-text-gray)]">Email:</span>
              <span className="text-sm font-medium text-[var(--color-text-black)]">
                {user.email}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--color-text-gray)]">Phone:</span>
              <span className="text-sm font-medium text-[var(--color-text-black)]">
                {user.phone_number}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--color-text-gray)]">
                Member Since:
              </span>
              <span className="text-sm font-medium text-[var(--color-text-black)]">
                {new Date(user.join_date).toLocaleDateString()}
              </span>
            </div>
          </div>
        )}

        {/* Warning Text */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-xs text-red-700">
            ⚠️ This will permanently delete the user account and all associated data.
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700"
          >
            {isLoading ? "Deleting..." : "Delete User"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

