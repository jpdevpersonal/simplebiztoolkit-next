/**
 * Edit Post Page
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { postsApi, mediaApi } from "@/lib/api-client";
import type {
  Post,
  TipTapDocument,
  UpdatePostInput,
  ThemeVariant,
} from "@/types/api";
import "@/styles/editor.css";

// Dynamic import for TipTap (client-side only)
const RichTextEditor = dynamic(
  () =>
    import("@/components/admin/RichTextEditor").then(
      (mod) => mod.RichTextEditor,
    ),
  {
    ssr: false,
    loading: () => <div className="editor-loading">Loading editor...</div>,
  },
);

const CATEGORIES = ["Bookkeeping", "Productivity", "Etsy Selling", "Branding"];
const THEME_VARIANTS: ThemeVariant[] = ["default", "marketing", "minimal"];

export default function EditPostPage() {
  useRouter(); // For navigation
  const params = useParams();
  const postId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [post, setPost] = useState<Post | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState<TipTapDocument | null>(null);
  const [category, setCategory] = useState("");
  const [readingMinutes, setReadingMinutes] = useState<number | "">("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [themeVariant, setThemeVariant] = useState<ThemeVariant>("default");

  // Load post data
  useEffect(() => {
    async function loadPost() {
      try {
        const result = await postsApi.getById(postId);
        if (result.success) {
          const p = result.data;
          setPost(p);
          setTitle(p.title);
          setSlug(p.slug);
          setExcerpt(p.excerpt || "");
          setContent(p.content);
          setCategory(p.category || "");
          setReadingMinutes(p.readingMinutes || "");
          setCoverImageUrl(p.coverImageUrl || "");
          setSeoTitle(p.seoTitle || "");
          setSeoDescription(p.seoDescription || "");
          setThemeVariant(p.themeVariant);
        } else {
          setError("Post not found");
        }
      } catch {
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [postId]);

  // Image upload handler
  const handleImageUpload = async (file: File): Promise<string> => {
    const result = await mediaApi.upload(file, undefined, postId);
    if (result.success) {
      return result.data.url;
    }
    throw new Error(result.error.message);
  };

  // Save post
  const handleSave = async () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const input: UpdatePostInput = {
        id: postId,
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        category: category || null,
        readingMinutes: readingMinutes || null,
        coverImageUrl: coverImageUrl.trim() || null,
        seoTitle: seoTitle.trim() || null,
        seoDescription: seoDescription.trim() || null,
        themeVariant,
      };

      const result = await postsApi.update(input);

      if (result.success) {
        setPost(result.data);
        // Show success message briefly
        setError(null);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

  // Publish post
  const handlePublish = async () => {
    await handleSave();
    if (post?.status !== "published") {
      const result = await postsApi.publish(postId);
      if (result.success) {
        setPost(result.data);
      }
    }
  };

  // Unpublish post
  const handleUnpublish = async () => {
    const result = await postsApi.unpublish(postId);
    if (result.success) {
      setPost(result.data);
    }
  };

  if (loading) {
    return (
      <div className="admin-content">
        <p>Loading post...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="admin-content">
        <p>Post not found</p>
        <Link href="/admin/posts" className="admin-btn admin-btn-secondary">
          Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <>
      <header className="admin-header">
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link
            href="/admin/posts"
            className="admin-btn admin-btn-secondary admin-btn-icon"
          >
            <BackIcon />
          </Link>
          <div>
            <h1 className="admin-header-title">Edit Post</h1>
            <span className={`admin-status admin-status-${post.status}`}>
              {post.status}
            </span>
          </div>
        </div>
        <div className="admin-header-actions">
          <a
            href={`/blog/${slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="admin-btn admin-btn-secondary"
          >
            Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="admin-btn admin-btn-secondary"
          >
            {saving ? "Saving..." : "Save"}
          </button>
          {post.status === "published" ? (
            <button
              onClick={handleUnpublish}
              disabled={saving}
              className="admin-btn admin-btn-secondary"
            >
              Unpublish
            </button>
          ) : (
            <button
              onClick={handlePublish}
              disabled={saving}
              className="admin-btn admin-btn-primary"
            >
              Publish
            </button>
          )}
        </div>
      </header>

      <div className="admin-content">
        {error && <div className="admin-error-banner">{error}</div>}

        <div className="post-editor-layout">
          {/* Main content */}
          <div className="post-editor-main">
            <div className="admin-form-group">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                className="admin-form-input post-title-input"
              />
            </div>

            <div className="admin-form-group">
              <RichTextEditor
                content={content}
                onChange={setContent}
                placeholder="Start writing your post..."
                onImageUpload={handleImageUpload}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="post-editor-sidebar">
            <div className="admin-card">
              <div className="admin-card-header">
                <h3 className="admin-card-title">Post Settings</h3>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="admin-form-input"
                    placeholder="post-url-slug"
                  />
                  <div className="admin-form-hint">/blog/{slug || "..."}</div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Excerpt</label>
                  <textarea
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="admin-form-textarea"
                    rows={3}
                    placeholder="Brief summary of the post"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="admin-form-select"
                  >
                    <option value="">Select category</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">
                    Reading Time (minutes)
                  </label>
                  <input
                    type="number"
                    value={readingMinutes}
                    onChange={(e) =>
                      setReadingMinutes(
                        e.target.value ? parseInt(e.target.value) : "",
                      )
                    }
                    className="admin-form-input"
                    min="1"
                    placeholder="5"
                  />
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Cover Image URL</label>
                  <input
                    type="text"
                    value={coverImageUrl}
                    onChange={(e) => setCoverImageUrl(e.target.value)}
                    className="admin-form-input"
                    placeholder="/images/articles/..."
                  />
                  {coverImageUrl && (
                    <img
                      src={coverImageUrl}
                      alt="Cover preview"
                      style={{
                        marginTop: "0.5rem",
                        maxWidth: "100%",
                        borderRadius: "4px",
                      }}
                    />
                  )}
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">Theme Variant</label>
                  <select
                    value={themeVariant}
                    onChange={(e) =>
                      setThemeVariant(e.target.value as ThemeVariant)
                    }
                    className="admin-form-select"
                  >
                    {THEME_VARIANTS.map((variant) => (
                      <option key={variant} value={variant}>
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="admin-card" style={{ marginTop: "1rem" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">SEO</h3>
              </div>
              <div className="admin-card-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">SEO Title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="admin-form-input"
                    placeholder={title || "Post title"}
                  />
                  <div className="admin-form-hint">
                    {(seoTitle || title).length}/60 characters
                  </div>
                </div>

                <div className="admin-form-group">
                  <label className="admin-form-label">SEO Description</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="admin-form-textarea"
                    rows={3}
                    placeholder={
                      excerpt || "Brief description for search engines"
                    }
                  />
                  <div className="admin-form-hint">
                    {(seoDescription || excerpt).length}/160 characters
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card" style={{ marginTop: "1rem" }}>
              <div className="admin-card-header">
                <h3 className="admin-card-title">Info</h3>
              </div>
              <div className="admin-card-body">
                <div style={{ fontSize: "0.875rem", color: "var(--sb-muted)" }}>
                  <p>
                    <strong>Created:</strong> {formatDate(post.createdAt)}
                  </p>
                  <p>
                    <strong>Updated:</strong> {formatDate(post.updatedAt)}
                  </p>
                  {post.publishedAt && (
                    <p>
                      <strong>Published:</strong> {formatDate(post.publishedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .post-editor-layout {
          display: grid;
          grid-template-columns: 1fr 340px;
          gap: 1.5rem;
        }

        .post-title-input {
          font-size: 1.5rem;
          font-weight: 700;
          padding: 0.875rem 1rem;
        }

        .admin-error-banner {
          background: #fee2e2;
          color: #dc2626;
          padding: 0.75rem 1rem;
          border-radius: var(--sb-radius-sm);
          margin-bottom: 1rem;
        }

        @media (max-width: 1024px) {
          .post-editor-layout {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
