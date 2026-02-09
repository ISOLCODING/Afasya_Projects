// src/lib/api/types.ts

export interface Author {
  name: string;
  avatar: string | null;
}

export interface Meta {
  title: string | null;
  description: string | null;
}

export interface Post {
  id: number;
  uuid: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  category: string;
  tags: string[] | null;
  status: string;
  published_at: string;
  views_count: number;
  featured_image: string | null;
  author: Author;
  meta: Meta;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
