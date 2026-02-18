// ============================================================
// Auth Types
// ============================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar: string;
}

export interface LoginResponse {
  message: string;
  user: UserProfile;
}

export interface LogoutResponse {
  message: string;
}
