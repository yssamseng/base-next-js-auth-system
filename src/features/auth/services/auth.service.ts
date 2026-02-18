// ============================================================
// Auth Service — login / logout operations
// ============================================================

import { apiClient } from "@/lib/api-client";
import { LoginRequest, LoginResponse, LogoutResponse } from "../types";

export const authService = {
  /**
   * Authenticate with email + password.
   * Sets an httpOnly session cookie on success.
   */
  login(credentials: LoginRequest) {
    return apiClient.post<LoginResponse>("/api/login", credentials);
  },

  /**
   * Clear the session cookie.
   */
  logout() {
    return apiClient.post<LogoutResponse>("/api/logout");
  },
};
