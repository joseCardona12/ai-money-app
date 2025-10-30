"use client";
import { useState } from "react";
import Modal from "@/ui/components/Modal";

interface IImageViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  imageName?: string;
  userName?: string;
}

export default function ImageViewerModal({
  isOpen,
  onClose,
  imageUrl,
  imageName = "Image",
  userName = "User",
}: IImageViewerModalProps): React.ReactNode {
  const [isImageBroken, setIsImageBroken] = useState(false);

  if (!imageUrl) return null;

  const getInitials = (fullName: string): string => {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length >= 2) {
      return (nameParts[0][0] + nameParts[1][0]).toUpperCase();
    }
    return fullName.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setIsImageBroken(true);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={imageName} size="xl">
      <div className="p-6 flex items-center justify-center bg-gray-50 rounded-lg">
        <div className="relative w-full max-w-2xl">
          {isImageBroken ? (
            <div className="w-full h-96 rounded-lg shadow-lg flex items-center justify-center bg-[var(--color-blue)] text-white">
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">
                  {getInitials(userName)}
                </div>
                <p className="text-sm text-gray-200">Image not available</p>
              </div>
            </div>
          ) : (
            <img
              src={imageUrl}
              alt={imageName}
              className="w-full h-auto rounded-lg shadow-lg"
              onError={handleImageError}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}
