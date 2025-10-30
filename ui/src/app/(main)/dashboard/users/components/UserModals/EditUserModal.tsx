"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { IUserUI } from "../../types/user";
import { useEffect } from "react";

interface IEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IEditUserFormData) => Promise<void>;
  isLoading?: boolean;
  user?: IUserUI | null;
}

export interface IEditUserFormData {
  fullName: string;
  email: string;
  phone_number: string;
  address: string;
  bio: string;
  role_id: string;
  plan_id: string;
  provider_id: string;
}

const editUserFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  bio: z.string(),
  role_id: z.string().min(1, "Role is required"),
  plan_id: z.string().min(1, "Plan is required"),
  provider_id: z.string().min(1, "Provider is required"),
});

const roleOptions = [
  { value: "1", label: "User" },
  { value: "2", label: "Admin" },
];

const planOptions = [
  { value: "1", label: "Free" },
  { value: "2", label: "Premium" },
  { value: "3", label: "Enterprise" },
];

const providerOptions = [
  { value: "1", label: "Email" },
  { value: "2", label: "Google" },
  { value: "3", label: "GitHub" },
];

export default function EditUserModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
  user,
}: IEditUserModalProps): React.ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IEditUserFormData>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone_number: "",
      address: "",
      bio: "",
      role_id: "1",
      plan_id: "1",
      provider_id: "1",
    },
    mode: "onChange",
  });

  // Update form values when user changes
  useEffect(() => {
    if (user && isOpen) {
      setValue("fullName", user.fullName || "");
      setValue("email", user.email || "");
      setValue("phone_number", user.phone_number || "");
      setValue("address", user.address || "");
      setValue("bio", user.bio || "");
      setValue("role_id", String(user.role_id || 1));
      setValue("plan_id", String(user.plan_id || 1));
      setValue("provider_id", String(user.provider_id || 1));
    }
  }, [user, isOpen, setValue]);

  const handleFormSubmit = async (data: IEditUserFormData) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Edit User" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Full Name */}
        <FormField<IEditUserFormData>
          label="Full Name"
          name="fullName"
          control={control}
          error={errors.fullName}
          placeholder="John Doe"
          type="text"
        />

        {/* Email */}
        <FormField<IEditUserFormData>
          label="Email"
          name="email"
          control={control}
          error={errors.email}
          placeholder="john@example.com"
          type="email"
        />

        {/* Phone Number */}
        <FormField<IEditUserFormData>
          label="Phone Number"
          name="phone_number"
          control={control}
          error={errors.phone_number}
          placeholder="+57 300 123 4567"
          type="text"
        />

        {/* Address */}
        <FormField<IEditUserFormData>
          label="Address"
          name="address"
          control={control}
          error={errors.address}
          placeholder="123 Main St, City"
          type="text"
        />

        {/* Bio */}
        <FormField<IEditUserFormData>
          label="Bio"
          name="bio"
          control={control}
          error={errors.bio}
          placeholder="User bio (optional)"
          type="text"
          isOptional={true}
        />

        {/* Role */}
        <FormFieldSelect<IEditUserFormData>
          label="Role"
          name="role_id"
          control={control}
          error={errors.role_id}
          options={roleOptions}
          placeholder="Select a role"
        />

        {/* Plan */}
        <FormFieldSelect<IEditUserFormData>
          label="Plan"
          name="plan_id"
          control={control}
          error={errors.plan_id}
          options={planOptions}
          placeholder="Select a plan"
        />

        {/* Provider */}
        <FormFieldSelect<IEditUserFormData>
          label="Provider"
          name="provider_id"
          control={control}
          error={errors.provider_id}
          options={providerOptions}
          placeholder="Select a provider"
        />

        {/* Actions */}
        <div className="flex gap-3 justify-end pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

