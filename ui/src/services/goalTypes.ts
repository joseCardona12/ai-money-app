import { IResponseDtoArray } from "@/interfaces/responseDto";
import { HTTPClient } from "@/utils/httpClient";

export interface IGoalTypeService {
  getAllGoalTypes(): Promise<IResponseDtoArray>;
}
class GoalTypesService implements IGoalTypeService {
  private httpClient: HTTPClient;
  constructor() {
    this.httpClient = new HTTPClient();
  }
  public async getAllGoalTypes(): Promise<IResponseDtoArray> {
    try {
      return await this.httpClient.get<IResponseDtoArray>("goal-types");
    } catch (error: any) {
      throw error;
    }
  }
}

export const goalTypesService = new GoalTypesService();
