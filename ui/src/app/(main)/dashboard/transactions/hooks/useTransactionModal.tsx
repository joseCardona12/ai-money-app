"use client";
import { useState } from "react";
import { ITransaction } from "../types/transaction";

export interface IModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  selectedTransaction?: ITransaction;
}

export default function useTransactionModal() {
  const [modal, setModal] = useState<IModalState>({
    isOpen: false,
    mode: "add",
    selectedTransaction: undefined,
  });

  const openAddModal = () => {
    setModal({
      isOpen: true,
      mode: "add",
      selectedTransaction: undefined,
    });
  };

  const openEditModal = (transaction: ITransaction) => {
    setModal({
      isOpen: true,
      mode: "edit",
      selectedTransaction: transaction,
    });
  };

  const closeModal = () => {
    setModal({
      isOpen: false,
      mode: "add",
      selectedTransaction: undefined,
    });
  };

  const handleEditTransaction = (transaction: ITransaction) => {
    openEditModal(transaction);
  };

  return {
    modal,
    openAddModal,
    openEditModal,
    closeModal,
    handleEditTransaction,
  };
}

