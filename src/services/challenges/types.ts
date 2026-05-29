export interface ChallengeResponse {
  challengeId: string;
  title: string;
  description: string;
  authorId: string;
  difficulty: number;
  rewardPoints: number;
  isPublished: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface PageChallengeResponse {
  content: ChallengeResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
}

export interface CreateChallengeRequest {
  title: string;
  description: string;
  difficulty: number;
  rewardPoints: number;
}

export interface UpdateChallengeRequest {
  title?: string;
  description?: string;
  difficulty?: number;
  rewardPoints?: number;
  isPublished?: boolean;
}

export interface CodeTemplateResponse {
  codeTemplateId: string;
  challengeId: string;
  entryFunctionName: string;
  language: string;
  templateCode: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateCodeTemplateRequest {
  entryFunctionName: string;
  language: string;
  templateCode: string;
}

export interface UpdateCodeTemplateRequest {
  entryFunctionName?: string;
  language?: string;
  templateCode?: string;
}

export interface TestCaseResponse {
  testCaseId: string;
  codeTemplateId: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
  updatedAt: string;
  createdAt: string;
}

export interface CreateTestCaseRequest {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface UpdateTestCaseRequest {
  input?: string;
  expectedOutput?: string;
  isHidden?: boolean;
}

export interface RequestSolutionAcceptedResponse {
  challengeId: string;
  language: string;
  status: string;
}

export interface CreateSolutionInChallengeRequest {
  language: string;
}

export interface SubmitChallengeContextResponse {
  templateCode: string;
  language: string;
  entryFunctionName: string;
  testCases: SubmitTestCaseResponse[];
}

export interface SubmitTestCaseResponse {
  testId: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ChallengesPageParams {
  page?: number;
  size?: number;
  sort?: string[];
  title?: string;
  difficulty?: string;
  language?: string;
}
