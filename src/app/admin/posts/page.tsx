/**
 * Admin Posts List Page
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { postsApi } from "@/lib/api-client";
import type { PostListItem, PostStatus } from "@/types/api";

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<PostStatus | "all">("all");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    try {
      const params = filter === "all" ? {} : { status: filter };
      const result = await postsApi.getAll({
        ...params,
        pageSize: 50,
        orderBy: "updatedAt",
        orderDir: "desc",
      });
      if (result.success) {
        setPosts(result.data.items);
        setTotal(result.data.total);
      }
    } catch {
      console.error("Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const result = await postsApi.delete(id);
      if (result.success) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        setTotal((prev) => prev - 1);
      } else {
        alert("Failed to delete post: " + result.error.message);
      }
    } catch {
      alert("Failed to delete post");
    }
  }

  async function handlePublish(id: string) {
    try {
      const result = await postsApi.publish(id);
      if (result.success) {
        loadPosts();
      }
    } catch {
      console.error("Failed to publish");
    }
  }

  async function handleUnpublish(id: string) {
    try {
      const result = await postsApi.unpublish(id);
      if (result.success) {
        loadPosts();
      }
    } catch {
      console.error("Failed to unpublish");
    }
  }

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Posts</h1>
        <div className="admin-header-actions">
          <Link href="/admin/posts/new" className="admin-btn admin-btn-primary">
            <PlusIcon />
            New Post
          </Link>
        </div>
      </header>

      <div className="admin-content">
        {/* Filters */}
        <div className="admin-filters">
          <button
            onClick={() => setFilter("all")}
            className={`admin-filter-btn ${filter === "all" ? "active" : ""}`}
          >
            All ({total})
          </button>
          <button
            onClick={() => setFilter("published")}
            className={`admin-filter-btn ${filter === "published" ? "active" : ""}`}
          >
            Published
          </button>
          <button
            onClick={() => setFilter("draft")}
            className={`admin-filter-btn ${filter === "draft" ? "active" : ""}`}
          >
            Drafts
          </button>
          <button
            onClick={() => setFilter("archived")}
            className={`admin-filter-btn ${filter === "archived" ? "active" : ""}`}
          >
            Archived
          </button>
        </div>

        {/* Posts Table */}
        <div className="admin-card">
          {loading ? (
            <div className="admin-card-body">
              <p>Loading posts...</p>
            </div>
          ) : posts.length === 0 ? (
            <div className="admin-card-body">
              <p style={{ color: "var(--sb-muted)" }}>
                No posts found.{" "}
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
                  <th>Category</th>
                  <th>Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id}>
                    <td>
                      <Link
                        href={`/admin/posts/${post.id}`}
                        style={{ fontWeight: 500, color: "var(--sb-ink)" }}
                      >
                        {post.title || "Untitled"}
                      </Link>
                      <div
                        style={{
                          fontSize: "0.8125rem",
                          color: "var(--sb-muted)",
                        }}
                      >
                        /blog/{post.slug}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`admin-status admin-status-${post.status}`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td style={{ color: "var(--sb-muted)" }}>
                      {post.category || "-"}
                    </td>
                    <td style={{ color: "var(--sb-muted)" }}>
                      {formatDate(post.updatedAt)}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link
                          href={`/admin/posts/${post.id}`}
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          Edit
                        </Link>
                        {post.status === "draft" && (
                          <button
                            onClick={() => handlePublish(post.id)}
                            className="admin-btn admin-btn-primary admin-btn-sm"
                          >
                            Publish
                          </button>
                        )}
                        {post.status === "published" && (
                          <button
                            onClick={() => handleUnpublish(post.id)}
                            className="admin-btn admin-btn-secondary admin-btn-sm"
                          >
                            Unpublish
                          </button>
                        )}
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="admin-btn admin-btn-secondary admin-btn-sm"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDelete(post.id)}
                          className="admin-btn admin-btn-danger admin-btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      <style jsx>{`
        .admin-filters {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .admin-filter-btn {
          padding: 0.5rem 1rem;
          border: 1px solid var(--sb-border);
          border-radius: var(--sb-radius-sm);
          background: #fff;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .admin-filter-btn:hover {
          background: var(--sb-soft);
        }

        .admin-filter-btn.active {
          background: var(--sb-green);
          color: #fff;
          border-color: var(--sb-green);
        }

        .admin-actions {
          display: flex;
          gap: 0.5rem;
          flex-wrap: wrap;
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
