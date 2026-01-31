/**
 * API Client for Blog CMS
 * Typed client for communicating with the C# backend API
 */

import type {
  Post,
  PostListItem,
  CreatePostInput,
  UpdatePostInput,
  PostQueryParams,
  Tag,
  CreateTagInput,
  Media,
  MediaQueryParams,
  ApiResult,
  PaginatedResponse,
  AuthSession,
} from "@/types/api";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

// ==============================================
// Base Fetch Wrapper
// ==============================================

interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

async function apiFetch<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<ApiResult<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  let url = `${API_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Default headers
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // Merge in custom headers
  if (fetchOptions.headers) {
    const customHeaders = fetchOptions.headers;
    if (customHeaders instanceof Headers) {
      customHeaders.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(customHeaders)) {
      customHeaders.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      Object.assign(headers, customHeaders);
    }
  }

  // Add auth token if available (client-side)
  if (typeof window !== "undefined") {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        success: false,
        error: {
          code: `HTTP_${response.status}`,
          message: errorData.message || response.statusText,
          details: errorData.details,
        },
      };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        code: "NETWORK_ERROR",
        message: error instanceof Error ? error.message : "Network error",
      },
    };
  }
}

// Server-side fetch with revalidation support
async function serverFetch<T>(
  endpoint: string,
  options: FetchOptions & { revalidate?: number | false } = {},
): Promise<ApiResult<T>> {
  const { revalidate, ...rest } = options;

  const nextOptions: { revalidate?: number | false; tags?: string[] } = {};
  if (revalidate !== undefined) {
    nextOptions.revalidate = revalidate;
  }

  return apiFetch<T>(endpoint, {
    ...rest,
    next: nextOptions as NextFetchRequestConfig,
  });
}

// ==============================================
// Auth Helpers
// ==============================================

const AUTH_TOKEN_KEY = "cms_auth_token";

function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function setAuthToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function clearAuthToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(AUTH_TOKEN_KEY);
}

// ==============================================
// Posts API
// ==============================================

export const postsApi = {
  /**
   * Get all published posts (public, server-side with ISR)
   */
  async getPublished(
    params: Omit<PostQueryParams, "status"> = {},
    revalidate: number = 60,
  ): Promise<ApiResult<PaginatedResponse<PostListItem>>> {
    return serverFetch<PaginatedResponse<PostListItem>>("/api/posts", {
      params: { ...params, status: "published" } as Record<
        string,
        string | number | undefined
      >,
      revalidate,
    });
  },

  /**
   * Get all posts (admin only, client-side)
   */
  async getAll(
    params: PostQueryParams = {},
  ): Promise<ApiResult<PaginatedResponse<PostListItem>>> {
    return apiFetch<PaginatedResponse<PostListItem>>("/api/posts", {
      params: params as Record<string, string | number | undefined>,
    });
  },

  /**
   * Get a single post by slug (public for published, server-side with ISR)
   */
  async getBySlug(
    slug: string,
    revalidate: number = 60,
  ): Promise<ApiResult<Post>> {
    return serverFetch<Post>(`/api/posts/slug/${slug}`, { revalidate });
  },

  /**
   * Get a single post by ID (admin only, client-side)
   */
  async getById(id: string): Promise<ApiResult<Post>> {
    return apiFetch<Post>(`/api/posts/${id}`);
  },

  /**
   * Create a new post (admin only)
   */
  async create(input: CreatePostInput): Promise<ApiResult<Post>> {
    return apiFetch<Post>("/api/posts", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  /**
   * Update an existing post (admin only)
   */
  async update(input: UpdatePostInput): Promise<ApiResult<Post>> {
    return apiFetch<Post>(`/api/posts/${input.id}`, {
      method: "PUT",
      body: JSON.stringify(input),
    });
  },

  /**
   * Delete a post (admin only)
   */
  async delete(id: string): Promise<ApiResult<void>> {
    return apiFetch<void>(`/api/posts/${id}`, {
      method: "DELETE",
    });
  },

  /**
   * Publish a post (admin only)
   */
  async publish(id: string): Promise<ApiResult<Post>> {
    return apiFetch<Post>(`/api/posts/${id}/publish`, {
      method: "POST",
    });
  },

  /**
   * Unpublish a post (admin only)
   */
  async unpublish(id: string): Promise<ApiResult<Post>> {
    return apiFetch<Post>(`/api/posts/${id}/unpublish`, {
      method: "POST",
    });
  },

  /**
   * Archive a post (admin only)
   */
  async archive(id: string): Promise<ApiResult<Post>> {
    return apiFetch<Post>(`/api/posts/${id}/archive`, {
      method: "POST",
    });
  },

  /**
   * Get all post slugs (for static generation)
   */
  async getAllSlugs(): Promise<
    ApiResult<{ slug: string; updatedAt: string }[]>
  > {
    return serverFetch<{ slug: string; updatedAt: string }[]>(
      "/api/posts/slugs",
      {
        revalidate: 60,
      },
    );
  },

  /**
   * Validate a slug (check uniqueness)
   */
  async validateSlug(
    slug: string,
    excludeId?: string,
  ): Promise<ApiResult<{ valid: boolean; suggestion?: string }>> {
    return apiFetch<{ valid: boolean; suggestion?: string }>(
      "/api/posts/validate-slug",
      {
        params: { slug, excludeId },
      },
    );
  },
};

// ==============================================
// Tags API
// ==============================================

export const tagsApi = {
  /**
   * Get all tags
   */
  async getAll(): Promise<ApiResult<Tag[]>> {
    return apiFetch<Tag[]>("/api/tags");
  },

  /**
   * Create a new tag (admin only)
   */
  async create(input: CreateTagInput): Promise<ApiResult<Tag>> {
    return apiFetch<Tag>("/api/tags", {
      method: "POST",
      body: JSON.stringify(input),
    });
  },

  /**
   * Delete a tag (admin only)
   */
  async delete(id: string): Promise<ApiResult<void>> {
    return apiFetch<void>(`/api/tags/${id}`, {
      method: "DELETE",
    });
  },
};

// ==============================================
// Media API
// ==============================================

export const mediaApi = {
  /**
   * Get all media
   */
  async getAll(
    params: MediaQueryParams = {},
  ): Promise<ApiResult<PaginatedResponse<Media>>> {
    return apiFetch<PaginatedResponse<Media>>("/api/media", {
      params: params as Record<string, string | number | undefined>,
    });
  },

  /**
   * Upload a file
   */
  async upload(
    file: File,
    alt?: string,
    postId?: string,
  ): Promise<ApiResult<Media>> {
    const formData = new FormData();
    formData.append("file", file);
    if (alt) formData.append("alt", alt);
    if (postId) formData.append("postId", postId);

    const token = getAuthToken();
    const headers: HeadersInit = {};
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_URL}/api/media`, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return {
          success: false,
          error: {
            code: `HTTP_${response.status}`,
            message: errorData.message || response.statusText,
          },
        };
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        error: {
          code: "UPLOAD_ERROR",
          message: error instanceof Error ? error.message : "Upload failed",
        },
      };
    }
  },

  /**
   * Update media metadata
   */
  async update(id: string, alt: string): Promise<ApiResult<Media>> {
    return apiFetch<Media>(`/api/media/${id}`, {
      method: "PUT",
      body: JSON.stringify({ alt }),
    });
  },

  /**
   * Delete media
   */
  async delete(id: string): Promise<ApiResult<void>> {
    return apiFetch<void>(`/api/media/${id}`, {
      method: "DELETE",
    });
  },
};

// ==============================================
// Auth API
// ==============================================

export const authApi = {
  /**
   * Get current session
   */
  async getSession(): Promise<ApiResult<AuthSession | null>> {
    return apiFetch<AuthSession | null>("/api/auth/session");
  },

  /**
   * Login with credentials
   */
  async login(
    email: string,
    password: string,
  ): Promise<ApiResult<AuthSession>> {
    const result = await apiFetch<AuthSession>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (result.success && result.data.accessToken) {
      setAuthToken(result.data.accessToken);
    }

    return result;
  },

  /**
   * Login with Azure AD token
   */
  async loginWithAzureAd(idToken: string): Promise<ApiResult<AuthSession>> {
    const result = await apiFetch<AuthSession>("/api/auth/azure-ad", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });

    if (result.success && result.data.accessToken) {
      setAuthToken(result.data.accessToken);
    }

    return result;
  },

  /**
   * Logout
   */
  async logout(): Promise<void> {
    clearAuthToken();
    await apiFetch("/api/auth/logout", { method: "POST" });
  },
};

// ==============================================
// Revalidation API (for ISR)
// ==============================================

export const revalidateApi = {
  /**
   * Trigger revalidation of blog pages (called by C# API webhook)
   */
  async revalidateBlog(): Promise<ApiResult<void>> {
    return apiFetch<void>("/api/revalidate", {
      method: "POST",
      body: JSON.stringify({ tags: ["posts"] }),
    });
  },

  /**
   * Trigger revalidation of a specific post
   */
  async revalidatePost(slug: string): Promise<ApiResult<void>> {
    return apiFetch<void>("/api/revalidate", {
      method: "POST",
      body: JSON.stringify({ paths: [`/blog/${slug}`] }),
    });
  },
};
