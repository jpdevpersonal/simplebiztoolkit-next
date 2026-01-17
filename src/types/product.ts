export type ProductCategory = {
  slug: string;
  name: string;
  summary: string;
  heroImage: string;
  items: Array<{
    title: string;
    problem: string;
    bullets: string[];
    image: string;
    etsyUrl: string;
    price: string;
  }>;
};

export type Product = ProductCategory["items"][number];
