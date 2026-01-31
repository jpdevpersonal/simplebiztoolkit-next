/**
 * New Post Page
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { postsApi, mediaApi } from "@/lib/api-client";
import type {
  TipTapDocument,
  CreatePostInput,
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

export default function NewPostPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  // Auto-generate slug from title
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);
    if (!slug || slug === generateSlug(title)) {
      setSlug(generateSlug(value));
    }
  };

  // Image upload handler
  const handleImageUpload = async (file: File): Promise<string> => {
    const result = await mediaApi.upload(file);
    if (result.success) {
      return result.data.url;
    }
    throw new Error(result.error.message);
  };

  // Save as draft
  const handleSaveDraft = async () => {
    await savePost("draft");
  };

  // Save and publish
  const handlePublish = async () => {
    await savePost("published");
  };

  const savePost = async (status: "draft" | "published") => {
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
      const input: CreatePostInput = {
        title: title.trim(),
        slug: slug.trim(),
        excerpt: excerpt.trim() || null,
        content,
        status,
        category: category || null,
        readingMinutes: readingMinutes || null,
        coverImageUrl: coverImageUrl.trim() || null,
        seoTitle: seoTitle.trim() || null,
        seoDescription: seoDescription.trim() || null,
        themeVariant,
        publishedAt: status === "published" ? new Date().toISOString() : null,
      };

      const result = await postsApi.create(input);

      if (result.success) {
        router.push(`/admin/posts/${result.data.id}`);
      } else {
        setError(result.error.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post");
    } finally {
      setSaving(false);
    }
  };

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
          <h1 className="admin-header-title">New Post</h1>
        </div>
        <div className="admin-header-actions">
          <button
            onClick={handleSaveDraft}
            disabled={saving}
            className="admin-btn admin-btn-secondary"
          >
            {saving ? "Saving..." : "Save Draft"}
          </button>
          <button
            onClick={handlePublish}
            disabled={saving}
            className="admin-btn admin-btn-primary"
          >
            Publish
          </button>
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
                onChange={(e) => handleTitleChange(e.target.value)}
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
