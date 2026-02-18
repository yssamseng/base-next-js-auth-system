// ============================================================
// API Types — shared request/response shapes
// ============================================================

/** Standard envelope every API response is wrapped in */
export interface ApiResponse<T = unknown> {
  data: T;
  message?: string;
}

/** Shape returned by the server on error */
export interface ApiError {
  error: string;
  status: number;
}
