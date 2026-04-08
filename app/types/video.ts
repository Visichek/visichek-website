export interface MediaItem {
  mediaType: "video" | "image" | string;
  category: string;
  requestUrl: string;
  url: string;
  name: string;
  dateCreated: string | null;
  lastUpdated: string | null;
  itemIndex: number;
  id: string;
}

export interface MediaResponseData {
  totalItems: number;
  listOfMedia: MediaItem[];
}

export interface MediaApiResponse {
  status_code: number;
  data: MediaResponseData;
  detail: string;
}
