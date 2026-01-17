import type { RouteObject } from "react-router";

import HomePage from "../spa_pages/HomePage";
import ProductsPage from "../spa_pages/ProductsPage";
import CategoryPage from "../spa_pages/CategoryPage";
import FreebiePage from "../spa_pages/FreebiePage";
import BlogIndexPage from "../spa_pages/BlogIndexPage";
import BlogPostPage from "../spa_pages/BlogPostPage";
import AboutPage from "../spa_pages/AboutPage";
import TestimonialsPage from "../spa_pages/TestimonialsPage";
import FaqPage from "../spa_pages/FaqPage";
import ContactPage from "../spa_pages/ContactPage";
import HelpPage from "../spa_pages/HelpPage";

export const routes: RouteObject[] = [
  { path: "/", element: <HomePage /> },
  { path: "/products", element: <ProductsPage /> },
  { path: "/products/:categorySlug", element: <CategoryPage /> },
  { path: "/free", element: <FreebiePage /> },
  { path: "/blog", element: <BlogIndexPage /> },
  { path: "/blog/:slug", element: <BlogPostPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/testimonials", element: <TestimonialsPage /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "/help", element: <HelpPage /> },
  { path: "/contact", element: <ContactPage /> },
];
