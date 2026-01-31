/**
 * Admin Login Page
 * Separate from admin layout (no auth required)
 */

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authApi } from "@/lib/api-client";
import "@/styles/admin.css";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const redirectUrl = searchParams.get("redirect") || "/admin";

  // Check if already logged in
  useEffect(() => {
    authApi.getSession().then((result) => {
      if (result.success && result.data) {
        router.push(redirectUrl);
      }
    });
  }, [router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authApi.login(email, password);
      if (result.success) {
        router.push(redirectUrl);
      } else {
        setError(result.error.message);
      }
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAzureAdLogin = () => {
    const returnUrl = encodeURIComponent(window.location.origin + redirectUrl);
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/azure-ad/login?returnUrl=${returnUrl}`;
  };

  return (
    <div className="admin-login">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <p className="admin-login-subtitle">
          Sign in to manage your blog content
        </p>

        {/* Azure AD Login */}
        <button
          type="button"
          onClick={handleAzureAdLogin}
          className="admin-btn admin-btn-azure"
        >
          <MicrosoftIcon />
          Sign in with Microsoft
        </button>

        <div className="admin-login-divider">or</div>

        {/* Email/Password Login */}
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="admin-form-error" style={{ marginBottom: "1rem" }}>
              {error}
            </div>
          )}

          <div className="admin-form-group">
            <label htmlFor="email" className="admin-form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="admin-form-input"
              required
              autoComplete="email"
            />
          </div>

          <div className="admin-form-group">
            <label htmlFor="password" className="admin-form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-form-input"
              required
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="admin-btn admin-btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21" fill="none">
      <rect x="1" y="1" width="9" height="9" fill="#F25022" />
      <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
      <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
      <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
    </svg>
  );
}
