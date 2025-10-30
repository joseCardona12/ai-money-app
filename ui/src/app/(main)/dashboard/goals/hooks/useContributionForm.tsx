"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contributionFormSchema, ContributionFormData, CURRENT_FORM_CONTRIBUTION } from "../utils/constants/contributionFormSchema";
import { IContributionRequest } from "@/interfaces/contributionRequest";

interface UseContributionFormProps {
  onSubmit: (data: IContributionRequest) => void;
  onCancel: () => void;
}

export default function useContributionForm({
  onSubmit,
  onCancel,
}: UseContributionFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContributionFormData>({
    resolver: zodResolver(contributionFormSchema),
    defaultValues: CURRENT_FORM_CONTRIBUTION,
  });

  const handleFormSubmit = (data: ContributionFormData) => {
    const contributionRequest: IContributionRequest = {
      amount: data.amount,
      description: data.description,
      date: data.date,
    };
    onSubmit(contributionRequest);
  };

  const handleCancel = () => {
    reset();
    onCancel();
  };

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    errors,
    handleCancel,
  };
}
