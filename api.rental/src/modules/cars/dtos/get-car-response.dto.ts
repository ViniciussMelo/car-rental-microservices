import { ApiProperty } from '@nestjs/swagger';

import { CreateCarResponseDto } from '@modules/cars/dtos/create-car-response.dto';
import { PaginationResponseDto } from '@shared/dtos/pagination-response.dto';

export class GetCarResponseDto extends PaginationResponseDto {
  @ApiProperty({
    type: [CreateCarResponseDto],
  })
  records: CreateCarResponseDto[];
}
