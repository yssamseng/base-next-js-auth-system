// ============================================================
// API Types — shared request/response shapes
// ============================================================

/** Standard success envelope from the API */
export interface ApiResponse<T = unknown> {
  status: true;
  transactionId: string;
  resCode: number;
  data: T;
}

/** Standard error envelope from the API */
export interface ApiError {
  status: false;
  transactionId: string;
  resCode: number;
  error: {
    developerMessage: string;
    userMessage: string;
  };
}
