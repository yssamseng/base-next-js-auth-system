// ============================================================
// API Client — lightweight fetch wrapper for real API
// ============================================================

import { getAccessToken, getRefreshToken, setTokens, clearTokens } from "./token";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000/api/v1";

/**
 * Custom error class that carries the HTTP status and server error message.
 */
export class ApiClientError extends Error {
  status: number;
  resCode?: number;

  constructor(message: string, status: number, resCode?: number) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
    this.resCode = resCode;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Override the base URL for this request */
  baseUrl?: string;
  /** Skip automatic token attachment */
  skipAuth?: boolean;
  /** @internal — prevents infinite retry loops */
  _retried?: boolean;
};

// ---- Token refresh singleton lock ----
let refreshPromise: Promise<boolean> | null = null;

/**
 * Attempt to refresh the access token using the stored refresh token.
 * Uses a singleton promise so concurrent 401s only trigger one refresh call.
 */
async function tryRefreshToken(): Promise<boolean> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${BASE_URL}/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) return false;

      const json = await res.json();
      setTokens(json.data.accessToken, json.data.refreshToken);
      return true;
    } catch {
      return false;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Core request function. All service methods delegate here.
 *
 * - Automatically serialises JSON bodies
 * - Automatically attaches Authorization header if token exists
 * - Parses JSON responses
 * - Throws `ApiClientError` on non-2xx responses using API error envelope
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { body, baseUrl, skipAuth, _retried, headers: customHeaders, ...rest } = options;

  const url = `${baseUrl ?? BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(customHeaders as Record<string, string>),
  };

  // Auto-attach bearer token
  if (!skipAuth) {
    const token = getAccessToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    ...rest,
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  };

  const response = await fetch(url, config);

  // Attempt to parse a JSON body regardless of status
  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new ApiClientError(
      "Failed to parse server response",
      response.status
    );
  }

  if (!response.ok) {
    // ---- Auto-refresh on 401 Unauthorized ----
    if (
      response.status === 401 &&
      !skipAuth &&
      !_retried &&
      !endpoint.includes("/auth/refresh-token")
    ) {
      const refreshed = await tryRefreshToken();
      if (refreshed) {
        // Retry the original request with the new access token
        return request<T>(endpoint, { ...options, _retried: true });
      }
      // Refresh failed — force logout
      clearTokens();
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }

    // Try to extract the API error envelope userMessage
    const apiError = data as {
      error?: { userMessage?: string; developerMessage?: string };
      resCode?: number;
    };
    const errorMessage =
      apiError?.error?.userMessage ??
      apiError?.error?.developerMessage ??
      response.statusText ??
      "Request failed";
    throw new ApiClientError(errorMessage, response.status, apiError?.resCode);
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
