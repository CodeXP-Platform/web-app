import type { Role } from "@/services/iam/types";

/** Roles allowed to author challenges. Mirrors the backend check in
 *  ChallengeCommandServiceImpl: only ROLE_TEACHER may create/update/publish. */
export const isTeacher = (role: Role | undefined): boolean =>
  role === "ROLE_TEACHER";

/** Languages supported by the code-execution service (see code-execution
 *  domain/language.go). Used to seed the code-template language picker. */
export const SUPPORTED_LANGUAGES = [
  "python",
  "javascript",
  "java",
  "cpp",
] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const DIFFICULTY_OPTIONS = [
  { value: 1, label: "Easy" },
  { value: 2, label: "Medium" },
  { value: 3, label: "Hard" },
  { value: 4, label: "Expert" },
] as const;
