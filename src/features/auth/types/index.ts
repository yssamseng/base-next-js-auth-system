// ============================================================
// Auth & User Types — matching real API spec
// ============================================================

/** POST /auth/register request body */
export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

/** POST /auth/login request body */
export interface LoginRequest {
  email: string;
  password: string;
}

/** User object returned by the API */
export interface UserProfile {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/** Data shape inside auth responses (login/register) */
export interface AuthResponseData {
  user: UserProfile;
  accessToken: string;
  refreshToken: string;
}

/** PUT /user/profile request body */
export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

/** POST /auth/change-password request body */
export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ---- API envelope types ----

export interface ApiSuccessResponse<T = unknown> {
  status: true;
  transactionId: string;
  resCode: number;
  data: T;
}

export interface ApiErrorResponse {
  status: false;
  transactionId: string;
  resCode: number;
  error: {
    developerMessage: string;
    userMessage: string;
  };
}

/** Token refresh response data */
export interface RefreshTokenData {
  accessToken: string;
  refreshToken: string;
}

export interface LogoutResponse {
  message: string;
}
