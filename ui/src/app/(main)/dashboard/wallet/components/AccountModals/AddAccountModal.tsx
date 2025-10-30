"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldNumber from "@/ui/components/FormFieldNumber";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import { SelectOption } from "@/interfaces/selectOption";
import { IAccount } from "../../types/wallet";
import { IAccountRequest } from "@/interfaces/accountRequest";
import useAccountForm from "../../hooks/useAccountForm";

interface IAddAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  account?: IAccount;
  onSubmit: (data: IAccountRequest) => void;
  accountTypes: SelectOption[];
  accountColors: SelectOption[];
}

export default function AddAccountModal({
  isOpen,
  onClose,
  mode,
  account,
  onSubmit,
  accountTypes,
  accountColors,
}: IAddAccountModalProps): React.ReactNode {
  const title = mode === "add" ? "Add Account" : "Edit Account";
  const submitButtonText = mode === "add" ? "Add Account" : "Save Changes";

  const { control, handleSubmit, errors, handleFormSubmit, handleCancel } =
    useAccountForm({
      mode,
      account,
      onSubmit,
      onCancel: onClose,
    });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="md">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Subtitle */}
        <p className="text-sm text-[var(--color-text-gray)]">
          {mode === "add"
            ? "Add a new account to track your finances across different banks and account types."
            : "Edit the account details below."}
        </p>

        {/* Account Name Field */}
        <FormField<IAccountRequest>
          label="Account Name"
          name="name"
          type="text"
          control={control}
          error={errors.name}
          placeholder="e.g., Main Checking, Emergency Savings"
        />

        {/* Account Type Field */}
        <FormFieldSelect<IAccountRequest>
          label="Account Type"
          name="type"
          control={control}
          error={errors.type}
          placeholder="Select account type"
          options={accountTypes}
        />

        {/* Bank Name Field */}
        <FormField<IAccountRequest>
          label="Bank Name"
          name="bank"
          type="text"
          control={control}
          error={errors.bank}
          placeholder="e.g., Chase Bank, Wells Fargo"
        />

        {/* Initial Balance Field */}
        <FormFieldNumber<IAccountRequest>
          label="Initial Balance"
          name="balance"
          control={control}
          error={errors.balance}
          placeholder="0.00"
          min={0}
        />

        {/* Account Number Field */}
        <FormField<IAccountRequest>
          label="Account Number"
          name="accountNumber"
          type="text"
          control={control}
          error={errors.accountNumber}
          placeholder="****1234 (optional)"
          isOptional
        />

        {/* Color Field */}
        <FormFieldSelect<IAccountRequest>
          label="Color"
          name="color"
          control={control}
          error={errors.color}
          placeholder="Select color"
          options={accountColors}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[var(--color-gray-border)]">
          <Button
            type="button"
            variant="outline"
            onClick={handleCancel}
            className="px-6"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="px-6"
          >
            {submitButtonText}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

