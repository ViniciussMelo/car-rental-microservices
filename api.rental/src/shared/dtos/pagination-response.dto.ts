import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDto {
  @ApiProperty({
    example: 1,
  })
  totalRecords: number;

  @ApiProperty({
    example: 1,
  })
  totalPages: number;

  @ApiProperty({
    example: 1,
  })
  nextPage: number;

  @ApiProperty({
    example: 1,
  })
  prevPage: number;

  @ApiProperty({
    example: 1,
  })
  page: number;

  @ApiProperty({
    example: 1,
  })
  perPage: number;

  @ApiProperty({
    example: 1,
  })
  pageCount: number;
}
