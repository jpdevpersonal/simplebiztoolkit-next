/**
 * Admin Dashboard Page
 */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { postsApi } from "@/lib/api-client";
import type { PostListItem } from "@/types/api";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
  });
  const [recentPosts, setRecentPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const [allResult, publishedResult, draftsResult] = await Promise.all([
          postsApi.getAll({
            pageSize: 5,
            orderBy: "updatedAt",
            orderDir: "desc",
          }),
          postsApi.getAll({ status: "published", pageSize: 1 }),
          postsApi.getAll({ status: "draft", pageSize: 1 }),
        ]);

        if (allResult.success) {
          setRecentPosts(allResult.data.items);
          setStats((prev) => ({ ...prev, totalPosts: allResult.data.total }));
        }
        if (publishedResult.success) {
          setStats((prev) => ({
            ...prev,
            publishedPosts: publishedResult.data.total,
          }));
        }
        if (draftsResult.success) {
          setStats((prev) => ({
            ...prev,
            draftPosts: draftsResult.data.total,
          }));
        }
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Dashboard</h1>
        <div className="admin-header-actions">
          <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
            <PlusIcon />
            New Post
          </Link>
        </div>
      </header>

      <div className="admin-content">
        {/* Stats */}
        <div className="admin-stats-grid">
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.totalPosts}</div>
            <div className="admin-stat-label">Total Posts</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.publishedPosts}</div>
            <div className="admin-stat-label">Published</div>
          </div>
          <div className="admin-stat-card">
            <div className="admin-stat-value">{stats.draftPosts}</div>
            <div className="admin-stat-label">Drafts</div>
          </div>
        </div>

        {/* Recent Posts */}
        <div className="admin-card" style={{ marginTop: "1.5rem" }}>
          <div className="admin-card-header">
            <h2 className="admin-card-title">Recent Posts</h2>
            <Link
              href="/admin/posts"
              className="admin-btn admin-btn-secondary admin-btn-sm"
            >
              View all
            </Link>
          </div>

          {loading ? (
            <div className="admin-card-body">
              <p>Loading...</p>
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="admin-card-body">
              <p style={{ color: "var(--sb-muted)" }}>
                No posts yet.{" "}
                <Link
                  href="/admin/posts/new"
                  style={{ color: "var(--sb-green)" }}
                >
                  Create your first post
                </Link>
              </p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Updated</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {recentPosts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        style={{ fontWeight: 500, color: "var(--sb-ink)" }}
                      >
                        {post.title}
                      </Link>
                    </td>
                    <td>
                      <span
                        className={`admin-status admin-status-${post.status}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--sb-muted)" }}>
                      {formatDate(post.updatedAt)}
                    </td>
                    <td>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .admin-stat-card {
          background: #fff;
          border: 1px solid var(--sb-border);
          border-radius: var(--sb-radius);
          padding: 1.5rem;
        }

        .admin-stat-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--sb-ink);
        }

        .admin-stat-label {
          font-size: 0.875rem;
          color: var(--sb-muted);
          margin-top: 0.25rem;
        }
      `}</style>
    </>
  );
}

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
