import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useState, useEffect, useCallback } from "react";
import {
  transactionFormSchema,
  CURRENT_FORM_TRANSACTION,
} from "../utils/constants/transactionFormSchema";
import { ITransaction } from "../types/transaction";
import { ITransactionRequest } from "@/interfaces/transactionRequest";
import { ICreateTransactionRequest } from "@/interfaces/transaction";
import { toast } from "sonner";
import { transactionService } from "@/services/transaction";
import useAuthListener from "../../hooks/useAuthListener";

interface IUseTransactionFormProps {
  mode: "add" | "edit";
  transaction?: ITransaction;
  isFetchingTransactions: boolean;
  setIsFetchTransactions: (isFetching: boolean) => void;
  onClose: () => void;
}

export default function useTransactionForm({
  mode,
  transaction,
  setIsFetchTransactions,
  isFetchingTransactions,
  onClose,
}: IUseTransactionFormProps) {
  const { user } = useAuthListener();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getDefaultValues = useCallback(() => {
    if (mode === "edit" && transaction) {
      return {
        type: String(transaction.type_id || ""),
        category: String(transaction.category_id || ""),
        amount: transaction.amount,
        date: transaction.date,
        description: transaction.description || "",
        state: String(transaction.state_id || ""),
        account: String(transaction.account_id || ""),
      };
    }
    return CURRENT_FORM_TRANSACTION;
  }, [mode, transaction]);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof transactionFormSchema>>({
    resolver: zodResolver(transactionFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Reset form when transaction changes (for edit mode)
  useEffect(() => {
    reset(getDefaultValues());
  }, [transaction, mode, reset]);

  const handleSubmitTransaction = async (
    data: ITransactionRequest
  ): Promise<void> => {
    setIsSubmitting(true);
    try {
      // Create a date with the current time for new transactions
      // For edit mode, preserve the original time
      // Colombia timezone is UTC-5
      const dateWithTime = new Date(data.date);

      if (mode === "add") {
        const now = new Date();
        // Set the time from the current moment
        dateWithTime.setHours(
          now.getHours(),
          now.getMinutes(),
          now.getSeconds()
        );
      } else if (mode === "edit" && transaction) {
        // For edit mode, preserve the original time from the transaction
        const originalDate = new Date(transaction.date);
        dateWithTime.setHours(
          originalDate.getHours(),
          originalDate.getMinutes(),
          originalDate.getSeconds()
        );
      }

      const transactionRequest: ICreateTransactionRequest = {
        description: data.description ?? "",
        amount: data.amount,
        date: dateWithTime,
        transaction_type_id: Number(data.type),
        state_id: Number(data.state),
        account_id: Number(data.account),
        category_id: Number(data.category),
      };

      if (!user?.id) {
        toast.error("Error", {
          description: "User not authenticated",
          duration: 2000,
        });
        setIsSubmitting(false);
        return;
      }

      const response =
        mode === "add"
          ? await transactionService.createTransaction(
              transactionRequest,
              user.id
            )
          : await transactionService.updateTransaction(
              transaction!.id,
              user.id,
              transactionRequest
            );

      if (response.status >= 400) {
        toast.error("Error", {
          description: response.message,
          duration: 2000,
        });
        setIsSubmitting(false);
        return;
      }
      toast.success("Success", {
        description:
          mode === "add"
            ? "Transaction created successfully"
            : "Transaction updated successfully",
        duration: 2000,
      });
      setIsFetchTransactions(!isFetchingTransactions);
      onClose();
    } catch (error) {
      console.log("Error:", error);
      toast.error("Error", {
        description: "An error occurred while processing your transaction",
        duration: 2000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit,
    setError,
    errors,
    handleSubmitTransaction,
    isSubmitting,
  };
}
