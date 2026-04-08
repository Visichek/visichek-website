export interface Author {
  name: string;
  avatarUrl: string;
  affiliation: string;
}

export interface Category {
  itemIndex: number | null;
  name: string;
  slug: string;
}

export interface FeatureImage {
  url: string;
  altText: string;
  credit: string;
}

export interface Blog {
  id: string;
  title: string;
  author: Author;
  category: Category;
  blogType: string;
  featureImage: FeatureImage;
  state: string;
  dateCreated: number; // Unix timestamp (seconds)
  lastUpdated: number; // Unix timestamp (seconds)
  slug: string;
  excerpt: string;
  itemIndex: number;
}

export interface HeroSectionResponse {
  status_code: number;
  data: {
    blogs: Blog[];
    totalItems: number;
  };
  detail: string;
}
