import { http } from "../axios";
import type {
    AchievementResponse,
    LeaderboardEntryResponse,
    UserProfileResponse,
} from "./types";

export class GamificationController {
    public static async getGlobalLeaderboard(): Promise<
        LeaderboardEntryResponse[]
    > {
        const response = await http.get<LeaderboardEntryResponse[]>(
            "/gamification/leaderboard/global",
        );
        return response.data;
    }

    public static async getChallengeLeaderboard(
        challengeId: string,
    ): Promise<LeaderboardEntryResponse[]> {
        const response = await http.get<LeaderboardEntryResponse[]>(
            `/gamification/leaderboard/challenge/${challengeId}`,
        );
        return response.data;
    }

    public static async getUserProfile(
        userId: string,
    ): Promise<UserProfileResponse> {
        const response = await http.get<UserProfileResponse>(
            `/gamification/users/${userId}/profile`,
        );
        return response.data;
    }

    public static async getAchievements(): Promise<AchievementResponse[]> {
        const response = await http.get<AchievementResponse[]>(
            "/gamification/achievements",
        );
        return response.data;
    }
}
