"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/config/links";
import { createPortal } from "react-dom";

export default function SiteNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  // Avoid SSR/client mismatch: portals can only exist after mount.
  useEffect(() => {
    const handle = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(handle);
  }, []);

  // Close menu only when route actually changes
  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;
    const handle = setTimeout(() => setIsOpen(false), 0);
    return () => clearTimeout(handle);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navItems = [
    { to: "/products", label: "Products" },
    { to: "/blog", label: "Resources" },
    { to: "/testimonials", label: "Reviews" },
    { to: "/faq", label: "FAQ" },
    { to: "/help", label: "Help" },
    // { to: "/contact", label: "Contact" },
    { to: "/about", label: "About" },
  ];

  const isActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const closeMenu = () => setIsOpen(false);

  const mobileMenu = (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          onClick={closeMenu}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.55)",
            zIndex: 9998,
            transition: "opacity 0.3s ease",
          }}
        />
      )}

      {/* Mobile Menu Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "min(85vw, 320px)",
          backgroundColor: "white",
          zIndex: 9999,
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease",
          display: "flex",
          flexDirection: "column",
          boxShadow: isOpen ? "-5px 0 25px rgba(0, 0, 0, 0.15)" : "none",
          pointerEvents: isOpen ? "auto" : "none",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #1f9d6d 0%, #0d5c3f 100%)",
            color: "white",
            padding: "1.25rem 1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            {/* <h4 style={{ margin: 0, fontWeight: 700, fontSize: "1.125rem" }}>
              Menu
            </h4> */}
            <p style={{ margin: 0, fontSize: "1rem" }}>Simple Biz Toolkit</p>
          </div>
          <button
            onClick={closeMenu}
            style={{
              border: "none",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "white",
            }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <div style={{ flex: 1, overflowY: "auto", backgroundColor: "#fafafa" }}>
          <nav style={{ padding: "0.5rem 0" }}>
            {navItems.map((item) => (
              <Link
                key={item.to}
                onClick={closeMenu}
                href={item.to}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "1rem 1.5rem",
                  textDecoration: "none",
                  color: "var(--sb-ink)",
                  fontWeight: 600,
                  fontSize: "1rem",
                  backgroundColor: "white",
                  borderBottom: "1px solid #eee",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: "var(--sb-brand-blue)",
                    borderRadius: "50%",
                    marginRight: "1rem",
                  }}
                />
                {item.label}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ marginLeft: "auto", opacity: 0.4 }}
                >
                  <path
                    d="M9 18L15 12L9 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div style={{ padding: "1.5rem" }}>
            <Link
              href={links.freebiePath}
              onClick={closeMenu}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem 1rem",
                marginBottom: "0.75rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9375rem",
                borderRadius: "8px",
                background: "var(--sb-green)",
                color: "white",
                border: "none",
              }}
            >
              Get Your Free Guide
            </Link>
            <a
              href={links.etsyShopUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                padding: "0.875rem 1rem",
                textDecoration: "none",
                fontWeight: 600,
                fontSize: "0.9375rem",
                borderRadius: "8px",
                backgroundColor: "white",
                color: "var(--sb-green)",
                border: "1px solid var(--sb-border)",
              }}
            >
              Shop on Etsy
            </a>

            <div
              style={{
                marginTop: "1.5rem",
                padding: "0.875rem",
                backgroundColor: "white",
                borderRadius: "8px",
                textAlign: "center",
                border: "1px solid var(--sb-border)",
                fontSize: "0.8125rem",
              }}
            >
              <div style={{ color: "var(--sb-muted)", fontWeight: 500 }}>
                🔒 Secure checkout via Etsy
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="d-none d-lg-flex align-items-center gap-2">
        {navItems.map((item) => (
          <Link
            key={item.to}
            className="px-3 py-2 text-decoration-none sb-muted rounded-pill nav-link"
            href={item.to}
            style={{
              transition: "all 0.2s ease",
              fontWeight: 600,
              backgroundColor: isActive(item.to)
                ? "var(--sb-soft)"
                : "transparent",
              color: isActive(item.to) ? "var(--sb-brand-blue)" : undefined,
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="d-lg-none"
        type="button"
        onClick={() => setIsOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsOpen(true);
        }}
        style={{
          border: "none",
          background: "transparent",
          color: "var(--sb-ink)",
          padding: "0.5rem",
          cursor: "pointer",
        }}
        aria-label="Open menu"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <div
            style={{
              width: "22px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
            }}
          />
          <div
            style={{
              width: "22px",
              height: "2px",
              backgroundColor: "currentColor",
              borderRadius: "1px",
            }}
          />
        </div>
      </button>

      {/* Portal the mobile menu to body to avoid z-index issues */}
      {mounted ? createPortal(mobileMenu, document.body) : null}
    </>
  );
}
