export enum AnalysisStatus {
  PASSED = "PASSED",
  FAILED = "FAILED",
}

export enum LeaderboardCategory {
  GLOBAL = "GLOBAL",
  CHALLENGE_SPECIFIC = "CHALLENGE_SPECIFIC",
}

export enum PointReason {
  CHALLENGE_SOLVED = "CHALLENGE_SOLVED",
  STREAK_BONUS = "STREAK_BONUS",
  FIRST_SUBMISSION = "FIRST_SUBMISSION",
}

export interface LeaderboardEntryResponse {
  rank: number;
  userId: string;
  username: string;
  score: number;
}

export interface UserAchievementResponse {
  achievementId: string;
  achievementName: string;
  description: string;
  badgeImageUrl: string;
  unlockedAt: string; // ISO 8601
}

export interface UserProfileResponse {
  userId: string;
  totalPoints: number;
  level: number;
  xp: number;
  achievements: UserAchievementResponse[];
}

export interface AchievementResponse {
  id: string;
  name: string;
  description: string;
  criteria: string; // JSON string with unlock conditions
  badgeImageUrl: string;
}
