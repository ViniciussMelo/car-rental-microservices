import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RentalDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
  })
  carId: number;
}
