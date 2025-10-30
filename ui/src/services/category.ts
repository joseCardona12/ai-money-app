import { HTTPClient } from "@/utils/httpClient";
import { IResponseDto } from "@/interfaces/responseDto";

export interface ICategory {
  id: number;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}

export interface ICategoryService {
  getAllCategories(): Promise<IResponseDto>;
  getCategoryById(categoryId: number): Promise<IResponseDto>;
}

class CategoryService implements ICategoryService {
  private httpClient: HTTPClient;

  constructor() {
    this.httpClient = new HTTPClient();
  }

  /**
   * Get all categories
   */
  public async getAllCategories(): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>("categories");
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get category by ID
   */
  public async getCategoryById(categoryId: number): Promise<IResponseDto> {
    try {
      return await this.httpClient.get<IResponseDto>(
        `categories/${categoryId}`
      );
    } catch (error) {
      throw error;
    }
  }
}

export const categoryService = new CategoryService();
