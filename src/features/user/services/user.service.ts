// ============================================================
// User Service — real API calls to /user/*
// ============================================================

import { apiClient } from "@/lib/api-client";
import type {
  UserProfile,
  UpdateProfileRequest,
  ApiSuccessResponse,
} from "@/features/auth/types";

export const userService = {
  /**
   * GET /user/profile
   */
  async getProfile() {
    return apiClient.get<ApiSuccessResponse<UserProfile>>("/user/profile");
  },

  /**
   * PUT /user/profile
   */
  async updateProfile(data: UpdateProfileRequest) {
    return apiClient.put<ApiSuccessResponse<UserProfile>>(
      "/user/profile",
      data
    );
  },
};
