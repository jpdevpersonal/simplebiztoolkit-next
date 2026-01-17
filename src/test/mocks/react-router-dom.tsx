/* eslint-disable react-refresh/only-export-components */
import { vi } from "vitest";

/**
 * Mock implementation of react-router-dom
 * This allows us to test components that use routing without needing a full router setup
 */

// Mock Link component - renders as an anchor tag for testing
export const Link = ({
  to,
  children,
  className,
  ...props
}: {
  to: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
}) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

// Mock useNavigate hook - returns a spy function
export const useNavigate = vi.fn(() => vi.fn());

// Mock useLocation hook - returns a default location object
export const useLocation = vi.fn(() => ({
  pathname: "/",
  search: "",
  hash: "",
  state: null,
}));

// Mock useParams hook - returns empty params by default
export const useParams = vi.fn(() => ({}));
