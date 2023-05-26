import { IPaginationResponse } from '@shared/interfaces/pagination-response.interface';

export class BasePaginationService<T> {
  protected paginate(
    totalRecords: number,
    pageCount: number,
    pageNumber: number,
    pageSize: number,
    data: Array<T>,
  ): IPaginationResponse<T> {
    const totalPages = Math.ceil(totalRecords / pageSize);
    const nextPage = pageNumber + 1;
    const prevPage = pageNumber - 1;

    return {
      totalRecords,
      totalPages,
      nextPage: nextPage > totalPages ? null : nextPage,
      prevPage: prevPage < 1 ? prevPage : null,
      page: pageNumber,
      perPage: pageSize,
      pageCount,
      records: data,
    };
  }
}
