import React from "react";
import "../styles/modal.css";
import Button from "@/ui/components/Button";
import { IconClose, IconError } from "../../../../../public/icons";
import { IconCheck } from "@tabler/icons-react";

export type ForgotPasswordStatus = "loading" | "success" | "error" | "idle";

interface IForgotPasswordStatusModalProps {
  isOpen: boolean;
  status: ForgotPasswordStatus;
  message?: string;
  onClose?: () => void;
}

export default function ForgotPasswordStatusModal({
  isOpen,
  status,
  message,
  onClose,
}: IForgotPasswordStatusModalProps): React.ReactNode {
  if (!isOpen) return null;

  const getStatusContent = () => {
    switch (status) {
      case "loading":
        return {
          icon: (
            <div
              className="w-16 h-16 border-4 border-t-transparent rounded-full animate-spin"
              style={{
                borderColor: "var(--color-blue)",
                borderTopColor: "transparent",
              }}
            ></div>
          ),
          title: "Sending...",
          description: "Please wait while we send the reset email",
          showCloseButton: true,
        };
      case "success":
        return {
          icon: (
            <div className="w-16 h-16 bg-[var(--color-green)] rounded-full flex items-center justify-center shadow-lg">
              <IconCheck className="w-8 h-8 text-white" />
            </div>
          ),
          title: "Email Sent",
          description:
            message || "Check your email for the password reset link",
          showCloseButton: true,
        };
      case "error":
        return {
          icon: (
            <div className="w-16 h-16 bg-[var(--color-red)] rounded-full flex items-center justify-center ">
              <IconError className="w-8 h-8 text-white" />
            </div>
          ),
          title: "Error",
          description:
            message ||
            "There was an error sending the reset email. Please try again!",
          showCloseButton: true,
        };
      default:
        return null;
    }
  };

  const content = getStatusContent();
  if (!content) return null;

  return (
    <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center relative shadow-2xl animate-slideUp">
        {content.showCloseButton && onClose && (
          <Button
            variant="outline"
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <IconClose className="h-5 w-5" />
          </Button>
        )}

        <div className="flex flex-col items-center space-y-6">
          {content.icon}

          <div className="space-y-3">
            <h3 className="text-2xl font-bold text-[var(--color-text-black)]">
              {content.title}
            </h3>
            <p className="text-[var(--color-text-gray)] leading-relaxed text-sm">
              {content.description}
            </p>
          </div>

          {content.showCloseButton && onClose && (
            <Button onClick={onClose} variant="primary" className="">
              Try Again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
