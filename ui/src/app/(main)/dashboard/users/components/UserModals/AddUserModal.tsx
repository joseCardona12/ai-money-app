"use client";
import Modal from "@/ui/components/Modal";
import Button from "@/ui/components/Button";
import FormField from "@/ui/components/FormField";
import FormFieldSelect from "@/ui/components/FormFieldSelect";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

interface IAddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: IAddUserFormData) => Promise<void>;
  isLoading?: boolean;
}

export interface IAddUserFormData {
  fullName: string;
  email: string;
  password: string;
  phone_number: string;
  address: string;
  bio: string;
  role_id: string;
  plan_id: string;
  provider_id: string;
}

const addUserFormSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must include a capital letter")
    .regex(/[a-z]/, "Must include a lowercase letter"),
  phone_number: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  bio: z.string(),
  role_id: z.string().min(1, "Role is required"),
  plan_id: z.string().min(1, "Plan is required"),
  provider_id: z.string().min(1, "Provider is required"),
});

const CURRENT_FORM_ADD_USER: IAddUserFormData = {
  fullName: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  bio: "",
  role_id: "1",
  plan_id: "1",
  provider_id: "1",
};

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

export default function AddUserModal({
  isOpen,
  onClose,
  onSubmit,
  isLoading = false,
}: IAddUserModalProps): React.ReactNode {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IAddUserFormData>({
    resolver: zodResolver(addUserFormSchema),
    defaultValues: CURRENT_FORM_ADD_USER,
    mode: "onChange",
  });

  const handleFormSubmit = async (data: IAddUserFormData) => {
    await onSubmit(data);
    reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add New User" size="lg">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="p-6 space-y-6">
        {/* Full Name */}
        <FormField<IAddUserFormData>
          label="Full Name"
          name="fullName"
          control={control}
          error={errors.fullName}
          placeholder="John Doe"
          type="text"
        />

        {/* Email */}
        <FormField<IAddUserFormData>
          label="Email"
          name="email"
          control={control}
          error={errors.email}
          placeholder="john@example.com"
          type="email"
        />

        {/* Password */}
        <FormField<IAddUserFormData>
          label="Password"
          name="password"
          control={control}
          error={errors.password}
          placeholder="Enter password"
          type="password"
        />

        {/* Phone Number */}
        <FormField<IAddUserFormData>
          label="Phone Number"
          name="phone_number"
          control={control}
          error={errors.phone_number}
          placeholder="+57 300 123 4567"
          type="text"
        />

        {/* Address */}
        <FormField<IAddUserFormData>
          label="Address"
          name="address"
          control={control}
          error={errors.address}
          placeholder="123 Main St, City"
          type="text"
        />

        {/* Bio */}
        <FormField<IAddUserFormData>
          label="Bio"
          name="bio"
          control={control}
          error={errors.bio}
          placeholder="User bio (optional)"
          type="text"
          isOptional={true}
        />

        {/* Role */}
        <FormFieldSelect<IAddUserFormData>
          label="Role"
          name="role_id"
          control={control}
          error={errors.role_id}
          options={roleOptions}
          placeholder="Select a role"
        />

        {/* Plan */}
        <FormFieldSelect<IAddUserFormData>
          label="Plan"
          name="plan_id"
          control={control}
          error={errors.plan_id}
          options={planOptions}
          placeholder="Select a plan"
        />

        {/* Provider */}
        <FormFieldSelect<IAddUserFormData>
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
            {isLoading ? "Creating..." : "Add User"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
