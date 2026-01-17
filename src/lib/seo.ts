import { site } from "@/config/site";

export function absoluteUrl(pathname: string) {
  const base = site.url.replace(/\/$/, "");
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}

export function truncate(input: string, maxLen: number) {
  if (input.length <= maxLen) return input;
  return `${input.slice(0, Math.max(0, maxLen - 1)).trimEnd()}…`;
}
