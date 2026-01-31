/**
 * TipTap Content Renderer
 * Safely renders TipTap/ProseMirror JSON as React components
 * Uses theme-aware CSS classes that integrate with theme.css
 */

import React from "react";
import Link from "next/link";
import Image from "next/image";
import type {
  TipTapDocument,
  TipTapNode,
  TipTapMark,
  TextNode,
  HeadingNode,
  ParagraphNode,
  BulletListNode,
  OrderedListNode,
  ListItemNode,
  BlockquoteNode,
  CodeBlockNode,
  ImageNode,
  CalloutNode,
} from "@/types/api";

// ==============================================
// Types
// ==============================================

// ==============================================
// Main Component
// ==============================================

interface PostContentProps {
  content: TipTapDocument | null;
  className?: string;
  variant?: "default" | "marketing" | "minimal";
}

export function PostContent({
  content,
  className = "",
  variant = "default",
}: PostContentProps) {
  if (!content || !content.content) {
    return null;
  }

  const variantClass = variant === "default" ? "" : `prose-variant-${variant}`;

  return (
    <div className={`prose ${variantClass} ${className}`.trim()}>
      {content.content.map((node, index) => (
        <RenderNode key={index} node={node} />
      ))}
    </div>
  );
}

// Default export for convenience
export default PostContent;

// ==============================================
// Node Renderer
// ==============================================

function RenderNode({ node }: { node: TipTapNode }): React.ReactElement | null {
  switch (node.type) {
    case "paragraph":
      return <RenderParagraph node={node as ParagraphNode} />;

    case "heading":
      return <RenderHeading node={node as HeadingNode} />;

    case "bulletList":
      return <RenderBulletList node={node as BulletListNode} />;

    case "orderedList":
      return <RenderOrderedList node={node as OrderedListNode} />;

    case "listItem":
      return <RenderListItem node={node as ListItemNode} />;

    case "blockquote":
      return <RenderBlockquote node={node as BlockquoteNode} />;

    case "codeBlock":
      return <RenderCodeBlock node={node as CodeBlockNode} />;

    case "image":
      return <RenderImage node={node as ImageNode} />;

    case "callout":
      return <RenderCallout node={node as CalloutNode} />;

    case "horizontalRule":
      return <RenderHorizontalRule />;

    case "text":
      return <RenderText node={node as TextNode} />;

    default:
      // Unknown node types are safely ignored
      console.warn(`Unknown node type: ${(node as TipTapNode).type}`);
      return null;
  }
}

// ==============================================
// Individual Node Renderers
// ==============================================

function RenderParagraph({ node }: { node: ParagraphNode }) {
  if (!node.content || node.content.length === 0) {
    return <p className="prose-p" />;
  }

  return (
    <p className="prose-p">
      {node.content.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </p>
  );
}

function RenderHeading({ node }: { node: HeadingNode }) {
  const level = node.attrs?.level || 2;
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  const className = `prose-h${level}`;

  if (!node.content) {
    return <Tag className={className} />;
  }

  return (
    <Tag className={className}>
      {node.content.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </Tag>
  );
}

function RenderBulletList({ node }: { node: BulletListNode }) {
  return (
    <ul className="prose-ul">
      {node.content.map((item, index) => (
        <RenderNode key={index} node={item} />
      ))}
    </ul>
  );
}

function RenderOrderedList({ node }: { node: OrderedListNode }) {
  const start = node.attrs?.start || 1;
  return (
    <ol className="prose-ol" start={start}>
      {node.content.map((item, index) => (
        <RenderNode key={index} node={item} />
      ))}
    </ol>
  );
}

function RenderListItem({ node }: { node: ListItemNode }) {
  return (
    <li className="prose-li">
      {node.content.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </li>
  );
}

function RenderBlockquote({ node }: { node: BlockquoteNode }) {
  return (
    <blockquote className="prose-blockquote">
      {node.content.map((child, index) => (
        <RenderNode key={index} node={child} />
      ))}
    </blockquote>
  );
}

function RenderCodeBlock({ node }: { node: CodeBlockNode }) {
  const language = node.attrs?.language || "";
  const code = node.content?.map((t) => (t as TextNode).text).join("") || "";

  return (
    <pre className={`prose-pre ${language ? `language-${language}` : ""}`}>
      <code className="prose-code">{code}</code>
    </pre>
  );
}

function RenderImage({ node }: { node: ImageNode }) {
  const { src, alt = "", title, width, height } = node.attrs;

  // Validate URL - only allow https and relative paths
  if (!isValidImageUrl(src)) {
    console.warn(`Invalid image URL blocked: ${src}`);
    return null;
  }

  // Use Next.js Image for optimized images
  if (width && height) {
    return (
      <figure className="prose-figure">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="prose-img"
          title={title}
        />
        {title && <figcaption className="prose-figcaption">{title}</figcaption>}
      </figure>
    );
  }

  // Fallback to img tag if dimensions unknown
  // Using img element here because we don't have dimensions for next/image
  return (
    <figure className="prose-figure">
      <img
        src={src}
        alt={alt}
        title={title}
        className="prose-img"
        loading="lazy"
      />
      {title && <figcaption className="prose-figcaption">{title}</figcaption>}
    </figure>
  );
}

function RenderCallout({ node }: { node: CalloutNode }) {
  const calloutType = node.attrs?.type || "info";
  const title = node.attrs?.title;

  // Only allow known callout types
  const validTypes = ["info", "warning", "success", "error"];
  const safeType = validTypes.includes(calloutType) ? calloutType : "info";

  return (
    <aside className={`prose-callout prose-callout-${safeType}`}>
      {title && <div className="prose-callout-title">{title}</div>}
      <div className="prose-callout-content">
        {node.content.map((child, index) => (
          <RenderNode key={index} node={child} />
        ))}
      </div>
    </aside>
  );
}

function RenderHorizontalRule() {
  return <hr className="prose-hr" />;
}

// ==============================================
// Text Renderer with Marks
// ==============================================

function RenderText({ node }: { node: TextNode }) {
  const { text, marks } = node;

  if (!marks || marks.length === 0) {
    return <>{text}</>;
  }

  // Apply marks in order
  return marks.reduce<React.ReactElement>(
    (element, mark) => applyMark(element, mark, text),
    <>{text}</>,
  );
}

function applyMark(
  element: React.ReactElement,
  mark: TipTapMark,
  originalText: string,
): React.ReactElement {
  switch (mark.type) {
    case "bold":
      return <strong className="prose-strong">{element}</strong>;

    case "italic":
      return <em className="prose-em">{element}</em>;

    case "strike":
      return <s className="prose-s">{element}</s>;

    case "underline":
      return <u className="prose-u">{element}</u>;

    case "code":
      return <code className="prose-inline-code">{element}</code>;

    case "link":
      return renderLink(element, mark.attrs, originalText);

    default:
      return element;
  }
}

function renderLink(
  element: React.ReactElement,
  attrs: { href: string; target?: string; rel?: string },
  text: string,
): React.ReactElement {
  const { href, target } = attrs;

  // Validate URL - only allow safe protocols
  if (!isValidLinkUrl(href)) {
    console.warn(`Invalid link URL blocked: ${href}`);
    return <>{text}</>;
  }

  // Internal links use Next.js Link
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className="prose-link">
        {element}
      </Link>
    );
  }

  // External links open in new tab with security attributes
  return (
    <a
      href={href}
      target={target || "_blank"}
      rel="noopener noreferrer"
      className="prose-link prose-link-external"
    >
      {element}
    </a>
  );
}

// ==============================================
// Security Helpers
// ==============================================

/**
 * Validate image URLs - only allow https and relative paths
 */
function isValidImageUrl(url: string): boolean {
  if (!url) return false;

  // Allow relative paths
  if (url.startsWith("/")) return true;

  // Allow https only
  if (url.startsWith("https://")) return true;

  // Block everything else (http, javascript:, data:, etc.)
  return false;
}

/**
 * Validate link URLs - block dangerous protocols
 */
function isValidLinkUrl(url: string): boolean {
  if (!url) return false;

  // Allow relative paths and anchors
  if (url.startsWith("/") || url.startsWith("#")) return true;

  // Allow http and https
  if (url.startsWith("https://") || url.startsWith("http://")) return true;

  // Allow mailto and tel
  if (url.startsWith("mailto:") || url.startsWith("tel:")) return true;

  // Block everything else (javascript:, data:, vbscript:, etc.)
  return false;
}

// ==============================================
// Export for testing
// ==============================================

export const __testing = {
  isValidImageUrl,
  isValidLinkUrl,
  RenderNode,
};
