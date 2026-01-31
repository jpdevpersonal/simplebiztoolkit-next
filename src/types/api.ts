/**
 * API Types for Blog CMS
 * These types define the contract between Next.js frontend and C# API backend
 */

// ==============================================
// Enums
// ==============================================

export type PostType = "blog" | "page";
export type PostStatus = "draft" | "published" | "archived";
export type ThemeVariant = "default" | "marketing" | "minimal";
export type UserRole = "admin" | "editor";

// ==============================================
// Post Types
// ==============================================

export interface Post {
  id: string;
  type: PostType;
  slug: string;
  title: string;
  excerpt: string | null;
  content: TipTapDocument | null;
  status: PostStatus;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;

  // Images
  coverImageUrl: string | null;

  // SEO fields
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  canonicalUrl: string | null;

  // Metadata
  authorName: string | null;
  readingMinutes: number | null;
  category: string | null;
  themeVariant: ThemeVariant;

  // Relations
  tags: Tag[];
}

export interface PostListItem {
  id: string;
  type: PostType;
  slug: string;
  title: string;
  excerpt: string | null;
  status: PostStatus;
  publishedAt: string | null;
  updatedAt: string;
  coverImageUrl: string | null;
  category: string | null;
  readingMinutes: number | null;
  tags: Tag[];
}

export interface CreatePostInput {
  type?: PostType;
  slug: string;
  title: string;
  excerpt?: string | null;
  content?: TipTapDocument | null;
  status?: PostStatus;
  publishedAt?: string | null;
  coverImageUrl?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  ogImageUrl?: string | null;
  canonicalUrl?: string | null;
  authorName?: string | null;
  readingMinutes?: number | null;
  category?: string | null;
  themeVariant?: ThemeVariant;
  tagIds?: string[];
}

export interface UpdatePostInput extends Partial<CreatePostInput> {
  id: string;
}

// ==============================================
// TipTap Document Types (ProseMirror-compatible)
// ==============================================

export interface TipTapDocument {
  type: "doc";
  content: TipTapNode[];
}

export type TipTapNode =
  | ParagraphNode
  | HeadingNode
  | BulletListNode
  | OrderedListNode
  | ListItemNode
  | BlockquoteNode
  | CodeBlockNode
  | ImageNode
  | CalloutNode
  | HorizontalRuleNode
  | TextNode;

export interface BaseNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: TipTapNode[];
  marks?: TipTapMark[];
}

export interface ParagraphNode extends BaseNode {
  type: "paragraph";
  content?: (TextNode | ImageNode)[];
}

export interface HeadingNode extends BaseNode {
  type: "heading";
  attrs: { level: 1 | 2 | 3 | 4 | 5 | 6 };
  content?: TextNode[];
}

export interface BulletListNode extends BaseNode {
  type: "bulletList";
  content: ListItemNode[];
}

export interface OrderedListNode extends BaseNode {
  type: "orderedList";
  attrs?: { start?: number };
  content: ListItemNode[];
}

export interface ListItemNode extends BaseNode {
  type: "listItem";
  content: (ParagraphNode | BulletListNode | OrderedListNode)[];
}

export interface BlockquoteNode extends BaseNode {
  type: "blockquote";
  content: (ParagraphNode | HeadingNode)[];
}

export interface CodeBlockNode extends BaseNode {
  type: "codeBlock";
  attrs?: { language?: string };
  content?: TextNode[];
}

export interface ImageNode extends BaseNode {
  type: "image";
  attrs: {
    src: string;
    alt?: string;
    title?: string;
    width?: number;
    height?: number;
  };
}

export interface CalloutNode extends BaseNode {
  type: "callout";
  attrs: {
    type: "info" | "warning" | "success" | "error";
    title?: string;
  };
  content: (ParagraphNode | BulletListNode)[];
}

export interface HorizontalRuleNode extends BaseNode {
  type: "horizontalRule";
}

export interface TextNode {
  type: "text";
  text: string;
  marks?: TipTapMark[];
}

// ==============================================
// TipTap Mark Types
// ==============================================

export type TipTapMark =
  | BoldMark
  | ItalicMark
  | StrikeMark
  | CodeMark
  | LinkMark
  | UnderlineMark;

export interface BoldMark {
  type: "bold";
}

export interface ItalicMark {
  type: "italic";
}

export interface StrikeMark {
  type: "strike";
}

export interface CodeMark {
  type: "code";
}

export interface LinkMark {
  type: "link";
  attrs: {
    href: string;
    target?: string;
    rel?: string;
    class?: string;
  };
}

export interface UnderlineMark {
  type: "underline";
}

// ==============================================
// Tag Types
// ==============================================

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

export interface CreateTagInput {
  name: string;
  slug?: string;
}

// ==============================================
// Media Types
// ==============================================

export interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  alt: string | null;
  createdAt: string;
  postId: string | null;
}

export interface UploadMediaInput {
  file: File;
  alt?: string;
  postId?: string;
}

export interface UpdateMediaInput {
  id: string;
  alt?: string;
  postId?: string;
}

// ==============================================
// User/Auth Types
// ==============================================

export interface User {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
}

export interface AuthSession {
  user: User;
  accessToken: string;
  expiresAt: string;
}

// ==============================================
// API Response Types
// ==============================================

export interface ApiResponse<T> {
  data: T;
  success: true;
}

export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, string[]>;
  };
}

export type ApiResult<T> = ApiResponse<T> | ApiError;

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ==============================================
// Query Parameters
// ==============================================

export interface PostQueryParams {
  status?: PostStatus;
  type?: PostType;
  category?: string;
  tag?: string;
  search?: string;
  page?: number;
  pageSize?: number;
  orderBy?: "publishedAt" | "createdAt" | "updatedAt" | "title";
  orderDir?: "asc" | "desc";
}

export interface MediaQueryParams {
  postId?: string;
  mimeType?: string;
  page?: number;
  pageSize?: number;
}
