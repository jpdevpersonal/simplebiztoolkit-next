/**
 * Auth Context and Hooks
 * Provides authentication state and helpers for the admin UI
 */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { authApi, clearAuthToken } from "@/lib/api-client";
import type { User } from "@/types/api";

// ==============================================
// Types
// ==============================================

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithAzureAd: () => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

// ==============================================
// Context
// ==============================================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ==============================================
// Provider Component
// ==============================================

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check session on mount
  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await authApi.getSession();
      if (result.success && result.data) {
        setUser(result.data.user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("Failed to refresh session:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  // Login with email/password
  const login = useCallback(async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authApi.login(email, password);
      if (result.success) {
        setUser(result.data.user);
        return true;
      } else {
        setError(result.error.message);
        return false;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // Login with Azure AD
  const loginWithAzureAd = useCallback(async () => {
    // Redirect to Azure AD login endpoint
    // The C# API will handle the OAuth flow and redirect back
    const returnUrl = encodeURIComponent(window.location.href);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/azure-ad/login?returnUrl=${returnUrl}`;
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      clearAuthToken();
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        loginWithAzureAd,
        logout,
        refreshSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ==============================================
// Hook
// ==============================================

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// ==============================================
// Auth Guard Component
// ==============================================

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <AuthLoading />;
  }

  if (!user) {
    return <AuthRedirect />;
  }

  return <>{children}</>;
}

function AuthLoading() {
  return (
    <div className="admin-loading">
      <div className="admin-loading-spinner" />
      <p>Loading...</p>
    </div>
  );
}

function AuthRedirect() {
  // Redirect to login page
  useEffect(() => {
    const currentPath = window.location.pathname;
    window.location.href = `/admin/login?redirect=${encodeURIComponent(currentPath)}`;
  }, []);

  return (
    <div className="admin-loading">
      <p>Redirecting to login...</p>
    </div>
  );
}
