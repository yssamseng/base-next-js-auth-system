// ============================================================
// API Client — lightweight fetch wrapper
// ============================================================

import { ApiError } from "@/types/api";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

/**
 * Custom error class that carries the HTTP status and server error message.
 */
export class ApiClientError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Override the base URL for this request */
  baseUrl?: string;
};

/**
 * Core request function. All service methods delegate here.
 *
 * - Automatically serialises JSON bodies
 * - Parses JSON responses
 * - Throws `ApiClientError` on non-2xx responses
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, baseUrl, headers: customHeaders, ...rest } = options;

  const url = `${baseUrl ?? BASE_URL}${endpoint}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const config: RequestInit = {
    ...rest,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(url, config);

  // Attempt to parse a JSON body regardless of status
  let data: T | ApiError;
  try {
    data = await response.json();
  } catch {
    throw new ApiClientError("Failed to parse server response", response.status);
  }

  if (!response.ok) {
    const errorMessage =
      (data as ApiError).error ?? response.statusText ?? "Request failed";
    throw new ApiClientError(errorMessage, response.status);
  }

  return data as T;
}

// ---- Convenience helpers ----

export const apiClient = {
  get<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "GET" });
  },

  post<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "POST", body });
  },

  put<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "PUT", body });
  },

  patch<T>(endpoint: string, body?: unknown, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "PATCH", body });
  },

  delete<T>(endpoint: string, options?: RequestOptions) {
    return request<T>(endpoint, { ...options, method: "DELETE" });
  },
};
