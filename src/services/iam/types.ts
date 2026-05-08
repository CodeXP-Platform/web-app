export type Role = "ROLE_STUDENT" | "ROLE_TEACHER" | "ROLE_ADMIN";
export type AuthProvider = "EMAIL" | "OAUTH";
export type OAuthProvider = "google" | "github";

export interface User {
  id: string;
  email: string;
  nickname: string;
  picture: string;
  role: Role;
  authProvider: AuthProvider;
  createdAt: string;
}

export interface PublicUser {
  id: string;
  nickname: string;
  picture: string;
  role: Role;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  user: User;
}

export interface TemporalTokenResponse {
  temporalToken: string;
}

export interface ErrorResponse {
  status: number;
  error: string;
  message: string;
  timestamp: string;
}

export interface AccessTokenPayload {
  sub: string;
  nickname: string;
  email: string;
  role: Role;
  temporal: false;
  iat: number;
  exp: number;
}

export interface RefreshTokenPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface TemporalTokenPayload {
  sub: string;
  nickname: string;
  email: string;
  role: Role;
  temporal: true;
  iat: number;
  exp: number;
}

export interface SignUpBody {
  email: string;
  nickname: string;
  password: string;
}

export interface SignInBody {
  email: string;
  password: string;
}

export interface RefreshTokenBody {
  refreshToken: string;
}

export interface OAuthBody {
  providerToken: string;
  nickname?: string;
}

export interface ExchangeTemporalTokenBody {
  temporalToken: string;
}
