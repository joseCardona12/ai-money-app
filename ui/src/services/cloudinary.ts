import { IResponseDto } from "@/interfaces/responseDto";
import {
  CLOUD_NAME,
  FOLDER,
  UPLOAD_PRESET,
} from "@/utils/constants/cloudinary";
import { HTTPClient } from "@/utils/httpClient";

export interface ICloudinaryService {
  uploadProfilePicture(file: File): Promise<IResponseDto>;
}

class CloudinaryService implements ICloudinaryService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  public async uploadProfilePicture(file: File): Promise<IResponseDto> {
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      formData.append("folder", FOLDER);
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return {
        status: response.status,
        message: response.ok
          ? "Image uploaded successfully"
          : "Failed to upload image",
        data: {
          url: data.secure_url || data.url,
        },
      };
    } catch (error) {
      throw error;
    }
  }
}

export const cloudinaryService = new CloudinaryService();
