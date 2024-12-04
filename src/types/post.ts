export interface Post {
  id: number;
  title: string;
  body: string;
  user_id: number;
}

export interface PaginationMeta {
  pagination: {
    total: number;
    pages: number;
    page: number;
    limit: number;
  };
}

export interface ApiResponse<T> {
  data: T;
  meta: PaginationMeta;
}
