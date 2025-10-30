"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { IAccount } from "@/services/account";
import { useEffect } from "react";

interface IEditAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IEditAccountFormData) => Promise<void>;
  isLoading?: boolean;
  account?: IAccount | null;
}

export interface IEditAccountFormData {
  name: string;
  account_type_id: string;
  account_number: string;
  balance: string;
  currency_id: string;
}

const editAccountFormSchema = z.object({
  name: z.string().min(1, "Account name is required"),
  account_type_id: z.string().min(1, "Account type is required"),
  account_number: z.string().min(1, "Account number is required"),
  balance: z.string().min(1, "Balance is required"),
  currency_id: z.string().min(1, "Currency is required"),
});

const accountTypeOptions = [
  { value: "1", label: "Checking" },
  { value: "2", label: "Savings" },
  { value: "3", label: "Money Market" },
  { value: "4", label: "Credit Card" },
];

const currencyOptions = [
  { value: "1", label: "USD" },
  { value: "2", label: "EUR" },
  { value: "3", label: "GBP" },
  { value: "4", label: "COP" },
];

export default function EditAccountModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  account,
}: IEditAccountModalProps): React.ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IEditAccountFormData>({
    resolver: zodResolver(editAccountFormSchema),
    defaultValues: {
      name: "",
      account_type_id: "1",
      account_number: "",
      balance: "0",
      currency_id: "1",
    },
    mode: "onChange",
  });

  // Update form values when account changes
  useEffect(() => {
    if (account && isOpen) {
      setValue("name", account.name || "");
      setValue("account_type_id", String(account.account_type_id || 1));
      setValue("account_number", account.account_number || "");
      setValue("balance", String(account.balance || 0));
      setValue("currency_id", String(account.currency_id || 1));
    }
  }, [account, isOpen, setValue]);

  const handleFormSubmit = async (data: IEditAccountFormData) => {
    await onSubmit({
      name: data.name,
      account_type_id: parseInt(data.account_type_id),
      account_number: data.account_number,
      balance: parseFloat(data.balance),
      currency_id: parseInt(data.currency_id),
    });
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  if (!account) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit Account" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Account Name */}
        <FormField<IEditAccountFormData>
          label="Account Name"
          name="name"
          control={control}
          error={errors.name}
          placeholder="e.g., My Savings"
          type="text"
        />

        {/* Account Type */}
        <FormFieldSelect<IEditAccountFormData>
          label="Account Type"
          name="account_type_id"
          control={control}
          error={errors.account_type_id}
          options={accountTypeOptions}
        />

        {/* Account Number */}
        <FormField<IEditAccountFormData>
          label="Account Number"
          name="account_number"
          control={control}
          error={errors.account_number}
          placeholder="e.g., 1234567890"
          type="text"
        />

        {/* Balance */}
        <FormField<IEditAccountFormData>
          label="Balance"
          name="balance"
          control={control}
          error={errors.balance}
          placeholder="0.00"
          type="number"
        />

        {/* Currency */}
        <FormFieldSelect<IEditAccountFormData>
          label="Currency"
          name="currency_id"
          control={control}
          error={errors.currency_id}
          options={currencyOptions}
        />

        {/* Footer */}
        <div className="flex gap-3 justify-end pt-4 border-t border-[var(--color-gray-border)]">
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={isLoading}
            isLoading={isLoading}
          >
            Update Account
          </Button>
        </div>
      </form>
    </Modal>
  );
}
