import { Expose, Type, plainToClass } from 'class-transformer';
import { IsOptional, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(50)
  @Expose()
  @ApiProperty({
    example: 10,
    required: false,
  })
  pageSize?: number;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Expose()
  pageNumber?: number;

  @IsOptional()
  @ApiProperty({
    example: 'createdAt',
    required: false,
  })
  @Expose()
  orderBy: string;

  @IsOptional()
  @ApiProperty({
    example: 'ASC',
    enum: ['ASC', 'DESC'],
    required: false,
  })
  @Expose()
  orderDirection: 'ASC' | 'DESC';

  static factory(data: PaginationDto) {
    const dto: PaginationDto = {
      ...data,
      pageNumber: data.pageNumber || 1,
      pageSize: data.pageSize || 10,
      orderBy: data.orderBy || 'createdAt',
      orderDirection: data.orderDirection || 'DESC',
    };

    return plainToClass(PaginationDto, dto, { excludeExtraneousValues: true });
  }
}
