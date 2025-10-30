"use client";
import { useState } from "react";
import { toast } from "sonner";
import { cloudinaryService } from "@/services/cloudinary";
import { userService } from "@/services/user";
import useAuthListener from "../../hooks/useAuthListener";

export default function useUploadProfilePicture() {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuthListener();

  const handleUploadProfilePicture = async (file: File): Promise<void> => {
    setLoading(true);
    try {
      // Step 1: Upload image to Cloudinary
      const uploadResponse = await cloudinaryService.uploadProfilePicture(file);

      // Check if upload was successful (status 200-299)
      if (!uploadResponse.data?.url) {
        toast.error("Error", {
          description: uploadResponse.message || "Failed to upload image",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      // Step 2: Get the image URL from the response
      const imageUrl = uploadResponse.data.url;

      // Step 3: Update user with the new profile picture URL
      const updateResponse = await userService.updateUser(Number(user?.id), {
        fullName: user?.fullName || "",
        email: user?.email || "",
        phoneNumber: user?.phone_number || "",
        location: user?.address || "",
        bio: user?.bio || "",
        profile_picture: imageUrl,
      });

      if (updateResponse.status >= 400) {
        toast.error("Error", {
          description:
            updateResponse.message || "Failed to update profile picture",
          duration: 2000,
        });
        setLoading(false);
        return;
      }

      // Step 4: Update localStorage with the new user data
      localStorage.setItem("user", JSON.stringify(updateResponse.data));

      // Step 5: Dispatch custom event to notify listeners
      window.dispatchEvent(
        new CustomEvent("user-updated", {
          detail: { type: "user-updated", user: updateResponse.data },
        })
      );

      toast.success("Success", {
        description: "Profile picture updated successfully",
        duration: 2000,
      });
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to upload profile picture";
      toast.error("Error", {
        description: errorMessage,
        duration: 2000,
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    handleUploadProfilePicture,
    loading,
  };
}
