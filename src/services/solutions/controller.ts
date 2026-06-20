import { http } from "../axios";
import type {
  AttemptResponse,
  CreateSolutionRequest,
  SolutionResponse,
  SubmitSolutionResponse,
  UpdateSolutionCodeRequest,
} from "./types";

export class SolutionsController {
  public static async createSolution(body: CreateSolutionRequest): Promise<SolutionResponse> {
    const response = await http.post<SolutionResponse>("/solutions", body);
    return response.data;
  }

  public static async getSolutionById(solutionId: string): Promise<SolutionResponse> {
    const response = await http.get<SolutionResponse>(`/solutions/${solutionId}`);
    return response.data;
  }

  public static async updateSolutionCode(solutionId: string, body: UpdateSolutionCodeRequest): Promise<SolutionResponse> {
    const response = await http.put<SolutionResponse>(`/solutions/${solutionId}`, body);
    return response.data;
  }

  public static async submitSolution(solutionId: string): Promise<SubmitSolutionResponse> {
    const response = await http.post<SubmitSolutionResponse>(`/solutions/${solutionId}/submit`);
    return response.data;
  }

  public static async getAttempts(solutionId: string): Promise<AttemptResponse[]> {
    const response = await http.get<AttemptResponse[]>(`/solutions/${solutionId}/attempts`);
    return response.data;
  }

  public static async getSolutionsByChallenge(challengeId: string): Promise<SolutionResponse[]> {
    const response = await http.get<SolutionResponse[]>(`/solutions/challenge/${challengeId}`);
    return response.data;
  }
}
