import { useState } from "react";

type ModalStatus = "loading" | "success" | "error" | "idle";

/**
 * Hook for managing verify email modal state
 * Handles modal visibility, status, and messages
 */
export default function useVerifyEmailModal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<ModalStatus>("idle");
  const [message, setMessage] = useState<string>("");

  /**
   * Shows the modal with loading state
   */
  const showLoading = (loadingMessage: string = "Resetting password...") => {
    setMessage(loadingMessage);
    setStatus("loading");
    setIsOpen(true);
  };

  /**
   * Shows the modal with success state
   */
  const showSuccess = (successMessage: string) => {
    setMessage(successMessage);
    setStatus("success");
    setIsOpen(true);
  };

  /**
   * Shows the modal with error state
   */
  const showError = (errorMessage: string) => {
    setMessage(errorMessage);
    setStatus("error");
    setIsOpen(true);
  };

  /**
   * Closes the modal
   */
  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    status,
    message,
    showLoading,
    showSuccess,
    showError,
    closeModal,
  };
}
