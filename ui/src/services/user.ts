import { IPersonalInformation } from "@/app/(main)/dashboard/myaccount/types/myaccount";
import { IResponseDto } from "@/interfaces/responseDto";
import { IUser } from "@/interfaces/user";
import { HTTPClient } from "@/utils/httpClient";

export interface IUpdateUserData {
  fullName?: string;
  email?: string;
  phone_number?: string;
  address?: string;
  bio?: string;
  profile_picture?: string;
  plan_id?: number;
}

export interface IUserService {
  getAllUsers(page?: number, limit?: number): Promise<IResponseDto>;
  getUserById(userId: number): Promise<IResponseDto>;
  createUser(user: IUser): Promise<IResponseDto>;
  updateUser(
    userId: number,
    user: IPersonalInformation | IUpdateUserData
  ): Promise<IResponseDto>;
  deleteUser(userId: number): Promise<IResponseDto>;
}
class UserService implements IUserService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Get all users with pagination
   */
  public async getAllUsers(
    page: number = 1,
    limit: number = 20
  ): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `users?page=${page}&limit=${limit}`
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  public async getUserById(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(`users/${userId}`);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a new user
   */
  public async createUser(user: IUser): Promise<IResponseDto> {
    try {
      return await this.httpClient.post<IUser, IResponseDto>("users", user);
    } catch (error) {
      throw error;
    }
  }

  public async updateUser(
    userId: number,
    user: IPersonalInformation | IUpdateUserData
  ): Promise<IResponseDto> {
    // Check if it's IPersonalInformation or IUpdateUserData
    const isPersonalInfo = "phoneNumber" in user && "location" in user;

    const updateData = isPersonalInfo
      ? {
          fullName: (user as IPersonalInformation).fullName,
          email: (user as IPersonalInformation).email,
          phone_number: (user as IPersonalInformation).phoneNumber,
          address: (user as IPersonalInformation).location,
          bio: (user as IPersonalInformation).bio,
          profile_picture:
            (user as IPersonalInformation).profile_picture ||
            "https://avatar.iran.liara.run/public/8",
        }
      : (user as IUpdateUserData);

    try {
      return await this.httpClient.put<IUpdateUserData, IResponseDto>(
        `users/${userId}`,
        updateData
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * Delete user by ID
   */
  public async deleteUser(userId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.delete<IResponseDto>(`users/${userId}`);
    } catch (error) {
      throw error;
    }
  }
}

export const userService = new UserService();
