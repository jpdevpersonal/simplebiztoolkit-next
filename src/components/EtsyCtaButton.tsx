import { links } from "@/config/links";
import type { AnchorHTMLAttributes } from "react";

interface EtsyCtaButtonProps extends Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children"
> {
  label?: string;
  href?: string;
  className?: string;
}

export default function EtsyCtaButton({
  label = "Shop on Etsy",
  href = links.etsyShopUrl,
  className,
  ...rest
}: EtsyCtaButtonProps) {
  const classes = ["ctaButton", className].filter(Boolean).join(" ");

  return (
    <a
      className={classes}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      {...rest}
    >
      {label}
    </a>
  );
}
