export interface PaginationResponse<Data> {
  page_info: {
    total_count: number;
    count: number;
    start_cursor: string;
    end_cursor: null | string;
  };
  data: Data;
}

export interface Headers {
  "Content-Type": "application/json";
  Authorization: `Bearer ${string}`;
}
