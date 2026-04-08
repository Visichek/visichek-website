export interface SearchAuthor {
  name: string;
  avatarUrl: string;
  affiliation: string;
}

export interface SearchCategory {
  name: string;
  slug: string;
  itemIndex?: number | null;
}

export interface SearchFeatureImage {
  url: string;
  altText: string;
  credit?: string | null;
}

export interface SearchBlogItem {
  id: string;
  title: string;
  author: SearchAuthor;
  category: SearchCategory;
  blogType: string;
  featureImage: SearchFeatureImage;
  state: string;
  dateCreated: number;
  lastUpdated: number;
  slug: string;
  excerpt: string;
  itemIndex: number;
}

export interface SearchResponse {
  status_code: number;
  data: {
    totalItems: number;
    blogs: SearchBlogItem[];
  };
  detail: string;
}
