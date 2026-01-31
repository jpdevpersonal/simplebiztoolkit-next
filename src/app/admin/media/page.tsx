/**
 * Media Library Page
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { mediaApi } from "@/lib/api-client";
import type { Media } from "@/types/api";

export default function AdminMediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [editAlt, setEditAlt] = useState("");

  useEffect(() => {
    loadMedia();
  }, []);

  async function loadMedia() {
    setLoading(true);
    try {
      const result = await mediaApi.getAll({ pageSize: 100 });
      if (result.success) {
        setMedia(result.data.items);
      }
    } catch (error) {
      console.error("Failed to load media:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleUpload = useCallback(async (files: FileList) => {
    setUploading(true);
    try {
      for (const file of files) {
        const result = await mediaApi.upload(file);
        if (result.success) {
          setMedia((prev) => [result.data, ...prev]);
        }
      }
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      if (e.dataTransfer.files.length > 0) {
        handleUpload(e.dataTransfer.files);
      }
    },
    [handleUpload],
  );

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this image?")) return;

    try {
      const result = await mediaApi.delete(id);
      if (result.success) {
        setMedia((prev) => prev.filter((m) => m.id !== id));
        if (selectedMedia?.id === id) {
          setSelectedMedia(null);
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateAlt = async () => {
    if (!selectedMedia) return;

    try {
      const result = await mediaApi.update(selectedMedia.id, editAlt);
      if (result.success) {
        setMedia((prev) =>
          prev.map((m) => (m.id === selectedMedia.id ? result.data : m)),
        );
        setSelectedMedia(result.data);
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    // Could add toast notification here
  };

  return (
    <>
      <header className="admin-header">
        <h1 className="admin-header-title">Media Library</h1>
        <div className="admin-header-actions">
          <label className="admin-btn admin-btn-primary">
            <UploadIcon />
            Upload
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => e.target.files && handleUpload(e.target.files)}
              style={{ display: "none" }}
            />
          </label>
        </div>
      </header>

      <div className="admin-content">
        <div className="media-layout">
          {/* Upload area / Grid */}
          <div className="media-main">
            {/* Drop zone */}
            <div
              className={`media-dropzone ${uploading ? "uploading" : ""}`}
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
            >
              {uploading ? (
                <p>Uploading...</p>
              ) : (
                <p>Drop images here or click Upload</p>
              )}
            </div>

            {/* Media grid */}
            {loading ? (
              <p>Loading media...</p>
            ) : media.length === 0 ? (
              <p
                style={{
                  color: "var(--sb-muted)",
                  textAlign: "center",
                  padding: "2rem",
                }}
              >
                No images uploaded yet.
              </p>
            ) : (
              <div className="media-grid">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className={`media-item ${selectedMedia?.id === item.id ? "selected" : ""}`}
                    onClick={() => {
                      setSelectedMedia(item);
                      setEditAlt(item.alt || "");
                    }}
                  >
                    <img src={item.url} alt={item.alt || item.originalName} />
                    <div className="media-item-overlay">
                      <span className="media-item-name">
                        {item.originalName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar - selected media details */}
          {selectedMedia && (
            <div className="media-sidebar">
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3 className="admin-card-title">Image Details</h3>
                  <button
                    onClick={() => setSelectedMedia(null)}
                    className="admin-btn admin-btn-icon admin-btn-sm"
                  >
                    ×
                  </button>
                </div>
                <div className="admin-card-body">
                  <img
                    src={selectedMedia.url}
                    alt={selectedMedia.alt || ""}
                    className="media-preview"
                  />

                  <div className="admin-form-group">
                    <label className="admin-form-label">Filename</label>
                    <div
                      style={{ fontSize: "0.875rem", wordBreak: "break-all" }}
                    >
                      {selectedMedia.originalName}
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">URL</label>
                    <div className="media-url-field">
                      <input
                        type="text"
                        value={selectedMedia.url}
                        readOnly
                        className="admin-form-input"
                        style={{ fontSize: "0.8125rem" }}
                      />
                      <button
                        onClick={() => copyUrl(selectedMedia.url)}
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                      >
                        Copy
                      </button>
                    </div>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Alt Text</label>
                    <input
                      type="text"
                      value={editAlt}
                      onChange={(e) => setEditAlt(e.target.value)}
                      className="admin-form-input"
                      placeholder="Describe this image"
                    />
                    <button
                      onClick={handleUpdateAlt}
                      className="admin-btn admin-btn-secondary admin-btn-sm"
                      style={{ marginTop: "0.5rem" }}
                    >
                      Update Alt
                    </button>
                  </div>

                  <div className="admin-form-group">
                    <label className="admin-form-label">Info</label>
                    <div
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--sb-muted)",
                      }}
                    >
                      <p>Size: {formatBytes(selectedMedia.size)}</p>
                      <p>Type: {selectedMedia.mimeType}</p>
                      <p>Uploaded: {formatDate(selectedMedia.createdAt)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(selectedMedia.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ width: "100%", marginTop: "1rem" }}
                  >
                    Delete Image
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .media-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .media-layout:has(.media-sidebar) {
          grid-template-columns: 1fr 320px;
        }

        .media-dropzone {
          border: 2px dashed var(--sb-border);
          border-radius: var(--sb-radius);
          padding: 2rem;
          text-align: center;
          color: var(--sb-muted);
          margin-bottom: 1.5rem;
          transition:
            border-color 0.15s ease,
            background 0.15s ease;
        }

        .media-dropzone:hover,
        .media-dropzone.uploading {
          border-color: var(--sb-green);
          background: rgba(26, 127, 90, 0.03);
        }

        .media-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 1rem;
        }

        .media-item {
          position: relative;
          aspect-ratio: 1;
          border-radius: var(--sb-radius-sm);
          overflow: hidden;
          cursor: pointer;
          border: 2px solid transparent;
          transition: border-color 0.15s ease;
        }

        .media-item:hover {
          border-color: var(--sb-green);
        }

        .media-item.selected {
          border-color: var(--sb-green);
          box-shadow: 0 0 0 2px rgba(26, 127, 90, 0.2);
        }

        .media-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .media-item-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.5rem;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
          opacity: 0;
          transition: opacity 0.15s ease;
        }

        .media-item:hover .media-item-overlay {
          opacity: 1;
        }

        .media-item-name {
          font-size: 0.75rem;
          color: #fff;
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .media-preview {
          width: 100%;
          border-radius: var(--sb-radius-sm);
          margin-bottom: 1rem;
        }

        .media-url-field {
          display: flex;
          gap: 0.5rem;
        }

        .media-url-field input {
          flex: 1;
          min-width: 0;
        }

        @media (max-width: 768px) {
          .media-layout:has(.media-sidebar) {
            grid-template-columns: 1fr;
          }

          .media-sidebar {
            order: -1;
          }
        }
      `}</style>
    </>
  );
}

function UploadIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
