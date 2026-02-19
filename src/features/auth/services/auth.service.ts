// ============================================================
// Auth Service — real API calls to /auth/*
// ============================================================

import { apiClient } from "@/lib/api-client";
import { setTokens, clearTokens, getRefreshToken } from "@/lib/token";
import type {
  LoginRequest,
  RegisterRequest,
  AuthResponseData,
  ChangePasswordRequest,
  RefreshTokenData,
  ApiSuccessResponse,
  LogoutResponse,
} from "../types";

export const authService = {
  /**
   * POST /auth/login
   */
  async login(credentials: LoginRequest) {
    const res = await apiClient.post<ApiSuccessResponse<AuthResponseData>>(
      "/auth/login",
      credentials,
      { skipAuth: true }
    );
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res;
  },

  /**
   * POST /auth/register
   */
  async register(data: RegisterRequest) {
    const res = await apiClient.post<ApiSuccessResponse<AuthResponseData>>(
      "/auth/register",
      data,
      { skipAuth: true }
    );
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res;
  },

  /**
   * POST /auth/logout
   */
  async logout() {
    const res = await apiClient.post<ApiSuccessResponse<LogoutResponse>>(
      "/auth/logout"
    );
    clearTokens();
    return res;
  },

  /**
   * POST /auth/refresh-token
   */
  async refreshToken() {
    const refreshToken = getRefreshToken();
    const res = await apiClient.post<ApiSuccessResponse<RefreshTokenData>>(
      "/auth/refresh-token",
      { refreshToken },
      { skipAuth: true }
    );
    setTokens(res.data.accessToken, res.data.refreshToken);
    return res;
  },

  /**
   * POST /auth/change-password
   */
  async changePassword(data: ChangePasswordRequest) {
    return apiClient.post<ApiSuccessResponse<{ message: string }>>(
      "/auth/change-password",
      data
    );
  },
};
