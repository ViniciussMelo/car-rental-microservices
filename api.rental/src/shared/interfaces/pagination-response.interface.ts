export interface IPaginationResponse<T> {
  totalRecords: number;
  totalPages: number;
  page: number;
  perPage: number;
  pageCount: number;
  nextPage: number;
  prevPage: number;
  records: Array<T>;
}
