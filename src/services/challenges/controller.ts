import { http } from "../axios";
import type {
  ChallengeResponse,
  ChallengesPageParams,
  CodeTemplateResponse,
  CreateChallengeRequest,
  CreateCodeTemplateRequest,
  CreateSolutionInChallengeRequest,
  CreateTestCaseRequest,
  PageChallengeResponse,
  RequestSolutionAcceptedResponse,
  SubmitChallengeContextResponse,
  TestCaseResponse,
  UpdateChallengeRequest,
  UpdateCodeTemplateRequest,
  UpdateTestCaseRequest,
} from "./types";

export class ChallengesController {
  public static async getChallenges(params: ChallengesPageParams = {}): Promise<PageChallengeResponse> {
    const { page = 0, size = 12, sort, title } = params;
    const response = await http.get<PageChallengeResponse>("/challenges", {
      params: { page, size, ...(sort && { sort }), ...(title && { title }) },
    });
    return response.data;
  }

  public static async getChallengeById(challengeId: string): Promise<ChallengeResponse> {
    const response = await http.get<ChallengeResponse>(`/challenges/${challengeId}`);
    return response.data;
  }

  public static async createChallenge(body: CreateChallengeRequest): Promise<ChallengeResponse> {
    const response = await http.post<ChallengeResponse>("/challenges", body);
    return response.data;
  }

  public static async updateChallenge(challengeId: string, body: UpdateChallengeRequest): Promise<ChallengeResponse> {
    const response = await http.put<ChallengeResponse>(`/challenges/${challengeId}`, body);
    return response.data;
  }

  public static async deleteChallenge(challengeId: string): Promise<void> {
    await http.delete(`/challenges/${challengeId}`);
  }

  public static async publishChallenge(challengeId: string): Promise<ChallengeResponse> {
    const response = await http.patch<ChallengeResponse>(`/challenges/${challengeId}/publish`);
    return response.data;
  }

  public static async createSolution(challengeId: string, body: CreateSolutionInChallengeRequest): Promise<RequestSolutionAcceptedResponse> {
    const response = await http.post<RequestSolutionAcceptedResponse>(`/challenges/${challengeId}/solutions`, body);
    return response.data;
  }

  public static async getSubmitContext(challengeId: string, language: string): Promise<SubmitChallengeContextResponse> {
    const response = await http.get<SubmitChallengeContextResponse>(`/challenges/${challengeId}/solutions/submit-context`, {
      params: { language },
    });
    return response.data;
  }

  // Code Templates
  public static async getCodeTemplates(challengeId: string): Promise<CodeTemplateResponse[]> {
    const response = await http.get<CodeTemplateResponse[]>(`/challenges/${challengeId}/code-templates`);
    return response.data;
  }

  public static async getCodeTemplateById(challengeId: string, codeTemplateId: string): Promise<CodeTemplateResponse> {
    const response = await http.get<CodeTemplateResponse>(`/challenges/${challengeId}/code-templates/${codeTemplateId}`);
    return response.data;
  }

  public static async createCodeTemplate(challengeId: string, body: CreateCodeTemplateRequest): Promise<CodeTemplateResponse> {
    const response = await http.post<CodeTemplateResponse>(`/challenges/${challengeId}/code-templates`, body);
    return response.data;
  }

  public static async updateCodeTemplate(challengeId: string, codeTemplateId: string, body: UpdateCodeTemplateRequest): Promise<CodeTemplateResponse> {
    const response = await http.patch<CodeTemplateResponse>(`/challenges/${challengeId}/code-templates/${codeTemplateId}`, body);
    return response.data;
  }

  public static async deleteCodeTemplate(challengeId: string, codeTemplateId: string): Promise<void> {
    await http.delete(`/challenges/${challengeId}/code-templates/${codeTemplateId}`);
  }

  // Test Cases
  public static async getTestCases(challengeId: string, codeTemplateId: string): Promise<TestCaseResponse[]> {
    const response = await http.get<TestCaseResponse[]>(`/challenges/${challengeId}/code-templates/${codeTemplateId}/test-cases`);
    return response.data;
  }

  public static async createTestCase(challengeId: string, codeTemplateId: string, body: CreateTestCaseRequest): Promise<TestCaseResponse> {
    const response = await http.post<TestCaseResponse>(`/challenges/${challengeId}/code-templates/${codeTemplateId}/test-cases`, body);
    return response.data;
  }

  public static async updateTestCase(challengeId: string, codeTemplateId: string, testCaseId: string, body: UpdateTestCaseRequest): Promise<TestCaseResponse> {
    const response = await http.patch<TestCaseResponse>(`/challenges/${challengeId}/code-templates/${codeTemplateId}/test-cases/${testCaseId}`, body);
    return response.data;
  }

  public static async deleteTestCase(challengeId: string, codeTemplateId: string, testCaseId: string): Promise<void> {
    await http.delete(`/challenges/${challengeId}/code-templates/${codeTemplateId}/test-cases/${testCaseId}`);
  }
}
