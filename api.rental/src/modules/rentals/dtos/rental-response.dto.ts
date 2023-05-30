import { ApiProperty } from '@nestjs/swagger';

export class RentalResponseDto {
  @ApiProperty({
    example: 1,
  })
  rentalId: number;
}
