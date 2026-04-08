export interface Category {
  itemIndex: number;
  name: string;
  slug: string;
  imageUrl?: string | null;
}

export interface CategoryApiResponse {
  status_code: number;
  data: {
    listOfCategories: Category[];
    totalItems: number;
  };
  detail: string;
}
