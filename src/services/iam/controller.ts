import { http } from "../axios";
import type {
  AuthResponse,
  ExchangeTemporalTokenBody,
  OAuthBody,
  OAuthProvider,
  RefreshTokenBody,
  SignInBody,
  SignUpBody,
  TemporalTokenResponse,
  UpdateProfileRequest,
  User,
} from "./types";

export class IamController {
  public static async signUp(body: SignUpBody): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/iam/auth/sign-up", body);
    return response.data;
  }

  public static async signIn(body: SignInBody): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/iam/auth/sign-in", body);
    return response.data;
  }

  public static async refresh(body: RefreshTokenBody): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>("/iam/auth/refresh", body);
    return response.data;
  }

  public static async oauthSignIn(
    provider: OAuthProvider,
    body: OAuthBody,
  ): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>(
      `/iam/auth/oauth/${provider}`,
      body,
    );
    return response.data;
  }

  public static async exchangeTemporalToken(
    body: ExchangeTemporalTokenBody,
  ): Promise<AuthResponse> {
    const response = await http.post<AuthResponse>(
      "/iam/auth/exchange-temporal-token",
      body,
    );
    return response.data;
  }

  public static async logout(): Promise<void> {
    await http.post("/iam/auth/logout");
  }

  public static async issueTemporalToken(): Promise<TemporalTokenResponse> {
    const response = await http.post<TemporalTokenResponse>(
      "/iam/users/me/temporal-token",
    );
    return response.data;
  }

  public static async getMyProfile(): Promise<User> {
    const response = await http.get<User>("/iam/users/me");
    return response.data;
  }

  public static async updateMyProfile(body: UpdateProfileRequest): Promise<User> {
    const response = await http.put<User>("/iam/users/me", body);
    return response.data;
  }
}
