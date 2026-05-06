import { http } from "../axios";
import { Challenge } from "./types";

export class ChallengesController {
    public static async getChallenges() {
        const response = await http.get<Challenge[]>(`/challenges`);
        return response.data;
    }
    public static async getChallengeById(challengeId: string) {}
    public static async createChallenge() {}
    public static async updateChallenge() {}
    public static async deleteChallenge() {}

    public static async getChallengeCodeTemplates() {}
    public static async addCodeTemplate() {}
    public static async editCodeTemplate() {}
    public static async deleteCodeTemplate() {}
    public static async getCodeTemplateById() {}
}
