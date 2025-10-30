import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  accountFormSchema,
  CURRENT_FORM_ACCOUNT,
} from "../utils/constants/accountFormSchema";
import { IAccountRequest } from "@/interfaces/accountRequest";
import { IAccount } from "../types/wallet";

interface IUseAccountFormProps {
  mode: "add" | "edit";
  account?: IAccount;
  onSubmit: (data: IAccountRequest) => void;
  onCancel: () => void;
}

export default function useAccountForm({
  mode,
  account,
  onSubmit,
  onCancel,
}: IUseAccountFormProps) {
  const getDefaultValues = () => {
    if (mode === "edit" && account) {
      return {
        name: account.name,
        type: account.type,
        bank: account.bank,
        balance: account.balance,
        accountNumber: account.accountNumber || "",
        color: account.color,
      };
    }
    return CURRENT_FORM_ACCOUNT;
  };

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: getDefaultValues(),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = async (data: IAccountRequest): Promise<void> => {
    try {
      onSubmit(data);
    } catch (error) {
      console.error("Error submitting account:", error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return {
    control,
    handleSubmit,
    setError,
    errors,
    handleFormSubmit,
    handleCancel,
  };
}
