"use client";
import { useState } from "react";
import { ITransaction } from "../types/transaction";
import { transactionService } from "@/services/transaction";
import useAuthListener from "../../hooks/useAuthListener";
import { toast } from "sonner";
import { exportTransactionReceiptToPDF } from "../utils/functions/pdfExport";

interface IDeleteConfirmationModal {
  isOpen: boolean;
  transactionId?: number;
}

export interface IDetailsModalState {
  isOpen: boolean;
  selectedTransaction?: ITransaction;
}

interface IUseTransactionDetailsReturn {
  detailsModal: IDetailsModalState;
  deleteConfirmationModal: IDeleteConfirmationModal;
  handleViewDetails: (transaction: ITransaction) => void;
  closeDetailsModal: () => void;
  handleDownloadReceipt: (transaction: ITransaction) => void;
  handleDeleteTransaction: (transactionId: number) => void;
  handleConfirmDelete: () => void;
  closeDeleteConfirmation: () => void;
  isDeleting: boolean;
  onTransactionDeleted?: () => void;
}

export default function useTransactionDetails(
  onTransactionDeleted?: () => void
): IUseTransactionDetailsReturn {
  const { user } = useAuthListener();
  const [detailsModal, setDetailsModal] = useState<IDetailsModalState>({
    isOpen: false,
    selectedTransaction: undefined,
  });
  const [deleteConfirmationModal, setDeleteConfirmationModal] =
    useState<IDeleteConfirmationModal>({
      isOpen: false,
      transactionId: undefined,
    });
  const [isDeleting, setIsDeleting] = useState(false);

  const handleViewDetails = (transaction: ITransaction) => {
    setDetailsModal({
      isOpen: true,
      selectedTransaction: transaction,
    });
  };

  const closeDetailsModal = () => {
    setDetailsModal({
      isOpen: false,
      selectedTransaction: undefined,
    });
  };

  const handleDownloadReceipt = async (transaction: ITransaction) => {
    try {
      if (!transaction) {
        toast.error("Error", {
          description: "Transaction not found",
          duration: 2000,
        });
        return;
      }

      // Ensure transaction has required fields
      if (!transaction.id || !transaction.date || !transaction.time) {
        toast.error("Error", {
          description: "Transaction data is incomplete",
          duration: 2000,
        });
        return;
      }

      await exportTransactionReceiptToPDF(transaction, {
        title: "Transaction Receipt",
        filename: `receipt-${transaction.id}-${
          new Date().toISOString().split("T")[0]
        }.pdf`,
      });

      toast.success("Success", {
        description: "Receipt downloaded successfully",
        duration: 2000,
      });
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast.error("Error", {
        description: "Failed to download receipt",
        duration: 2000,
      });
    }
  };

  const handleDeleteTransaction = (transactionId: number) => {
    setDeleteConfirmationModal({
      isOpen: true,
      transactionId,
    });
  };

  const closeDeleteConfirmation = () => {
    setDeleteConfirmationModal({
      isOpen: false,
      transactionId: undefined,
    });
  };

  const handleConfirmDelete = async () => {
    if (!user?.id || !deleteConfirmationModal.transactionId) {
      toast.error("Error", {
        description: "User not authenticated or transaction not found",
        duration: 2000,
      });
      return;
    }

    setIsDeleting(true);
    try {
      const response = await transactionService.deleteTransaction(
        deleteConfirmationModal.transactionId,
        user.id
      );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message || "Failed to delete transaction",
          duration: 2000,
        });
        setIsDeleting(false);
        return;
      }

      toast.success("Success", {
        description: "Transaction deleted successfully",
        duration: 2000,
      });

      closeDetailsModal();
      closeDeleteConfirmation();
      onTransactionDeleted?.();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast.error("Error", {
        description: "An error occurred while deleting the transaction",
        duration: 2000,
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    detailsModal,
    deleteConfirmationModal,
    handleViewDetails,
    closeDetailsModal,
    handleDownloadReceipt,
    handleDeleteTransaction,
    handleConfirmDelete,
    closeDeleteConfirmation,
    isDeleting,
    onTransactionDeleted,
  };
}
