export interface SolutionResponse {
  solutionId: string;
  challengeId: string;
  codeTemplateId: string;
  authorId: string;
  language: string;
  code: string;
  status: string;
  maxAttempts: number;
  currentAttempts: number;
  remainingAttempts: number;
  attemptsResetAt: string;
  updatedAt: string;
  createdAt: string;
}

export interface CreateSolutionRequest {
  challengeId: string;
  codeTemplateId: string;
  language: string;
}

export interface UpdateSolutionCodeRequest {
  code: string;
}

export interface SubmitSolutionResponse {
  solutionId: string;
  attemptId: string;
  status: string;
  currentAttempts: number;
  maxAttempts: number;
  remainingAttempts: number;
  attemptsResetAt: string;
}

export interface AttemptResponse {
  id: string;
  status: string;
  executionTimeMs: number;
  errorDetails: string | null;
  failedTestIds: string[];
  createdAt: string;
}
