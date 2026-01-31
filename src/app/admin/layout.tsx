/**
 * Admin Layout
 * Main layout wrapper for all admin pages
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AuthProvider, RequireAuth, useAuth } from "@/lib/auth";
import "@/styles/admin.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <RequireAuth>
        <AdminShell>{children}</AdminShell>
      </RequireAuth>
    </AuthProvider>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const navItems = [
    {
      section: "Content",
      items: [
        { href: "/admin", label: "Dashboard", icon: DashboardIcon },
        { href: "/admin/posts", label: "Posts", icon: PostsIcon },
        { href: "/admin/media", label: "Media", icon: MediaIcon },
      ],
    },
    {
      section: "Settings",
      items: [{ href: "/admin/tags", label: "Tags", icon: TagsIcon }],
    },
  ];

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <Link href="/admin" className="admin-sidebar-brand">
            Simple Biz CMS
          </Link>
        </div>

        <nav className="admin-sidebar-nav">
          {navItems.map((section) => (
            <div key={section.section} className="admin-nav-section">
              <div className="admin-nav-section-title">{section.section}</div>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`admin-nav-link ${
                    pathname === item.href ? "active" : ""
                  }`}
                >
                  <item.icon className="admin-nav-icon" />
                  {item.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user-info">
            <div className="admin-user-avatar">
              {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
            </div>
            <div>
              <div className="admin-user-name">{user?.name || user?.email}</div>
              <div className="admin-user-role">{user?.role}</div>
            </div>
          </div>
          <button
            onClick={logout}
            className="admin-btn admin-btn-secondary admin-btn-sm"
            style={{ marginTop: "0.75rem", width: "100%" }}
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="admin-main">{children}</div>
    </div>
  );
}

// ==============================================
// Icons
// ==============================================

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  );
}

function PostsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function MediaIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

function TagsIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}
