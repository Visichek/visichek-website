export interface BlogApiResponse {
  status_code: number;
  data: BlogItem;
  detail: string;
}

export interface BlogItem {
  title: string;
  author: Author;
  category: Category;
  blogType: "normal" | string; // Add other possible types
  featureImage: FeatureImage;
  pages: null | any; // Define more specifically if needed
  currentPageBody: Block[];
  id: string;
  state: "published" | "draft" | string;
  dateCreated: number;
  lastUpdated: number;
  slug: string;
  excerpt: string;
}

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
  credit: string | null;
}

// Block Types
export type BlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "bulletListItem"
  | "numberedListItem";

export interface Block {
  id: string;
  type: BlockType;
  props: BlockProps;
  content: TextContent[];
  children: Block[];
}

export interface BlockProps {
  backgroundColor: string;
  textColor: string;
  textAlignment: "left" | "center" | "right" | "justify";
  // Optional image properties
  name?: string;
  url?: string;
  caption?: string;
  showPreview?: boolean;
  previewWidth?: number;
  // Optional heading properties
  level?: number;
}

export interface TextContent {
  type: "text";
  text: string;
  styles: TextStyle;
}

export interface TextStyle {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strike?: boolean;
  code?: boolean;
}
