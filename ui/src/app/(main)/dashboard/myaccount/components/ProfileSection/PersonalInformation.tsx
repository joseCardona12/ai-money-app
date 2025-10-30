"use client";
import { IPersonalInformation } from "../../types/myaccount";
import Input from "@/ui/components/Input";
import Button from "@/ui/components/Button";
import { useState, useEffect } from "react";
import { Controller } from "react-hook-form";
import useFormPersonalInformation from "../../hooks/useFormPersonalInformation";

interface PersonalInformationProps {
  personalInformation: IPersonalInformation;
}

export default function PersonalInformation({
  personalInformation,
}: PersonalInformationProps): React.ReactNode {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const {
    control,
    handleSubmit,
    errors,
    handleSavePersonalInformation,
    loading,
    reset,
  } = useFormPersonalInformation(personalInformation);

  useEffect(() => {
    if (isSaving && !loading) {
      setIsEditing(false);
      setIsSaving(false);
    }
  }, [loading, isSaving]);

  const handleCancel = () => {
    reset(personalInformation);
    setIsEditing(false);
  };

  const handleSaveAndClose = async (data: IPersonalInformation) => {
    setIsSaving(true);
    await handleSavePersonalInformation(data);
  };

  return (
    <div className="bg-white rounded-xl border border-[var(--color-gray-border)] p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
            Personal Information
          </h3>
          <p className="text-sm text-[var(--color-text-gray)]">
            Update your personal details
          </p>
        </div>
        {!isEditing && (
          <Button
            variant="primary"
            onClick={() => setIsEditing(true)}
            className="text-sm"
          >
            Edit Profile
          </Button>
        )}
      </div>

      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleSaveAndClose)}
          className={`space-y-4 flex-1 flex flex-col transition-opacity duration-300 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="fullName"
              control={control}
              render={({ field }) => (
                <div>
                  <Input type="text" placeholder="Full Name" {...field} />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <Input type="email" placeholder="Email Address" {...field} />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="phoneNumber"
              control={control}
              render={({ field }) => (
                <div>
                  <Input type="tel" placeholder="Phone Number" {...field} />
                  {errors.phoneNumber && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="location"
              control={control}
              render={({ field }) => (
                <div>
                  <Input type="text" placeholder="Location" {...field} />
                  {errors.location && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.location.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <Controller
            name="bio"
            control={control}
            render={({ field }) => (
              <div>
                <textarea
                  placeholder="Bio"
                  {...field}
                  className="w-full border p-2 outline-none rounded-md text-sm shadow-sm/2 focus:shadow-sm"
                  style={{
                    borderColor: "var(--color-gray-border)",
                    color: "var(--color-text-gray)",
                  }}
                  rows={4}
                />
                {errors.bio && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.bio.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex gap-3 justify-end mt-auto">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      ) : (
        <div
          className={`space-y-4 flex-1 flex flex-col transition-opacity duration-300 ${
            loading ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-1">
                Full Name
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">
                {personalInformation.fullName}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-1">
                Email Address
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">
                {personalInformation.email}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-1">
                Phone Number
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">
                {personalInformation.phoneNumber}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-1">
                Location
              </p>
              <p className="text-sm text-[var(--color-text-primary)]">
                {personalInformation.location}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[var(--color-text-gray)] uppercase mb-1">
              Bio
            </p>
            <p className="text-sm text-[var(--color-text-primary)]">
              {personalInformation.bio}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

