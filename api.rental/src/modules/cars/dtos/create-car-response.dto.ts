import { ApiProperty } from '@nestjs/swagger';

export class CreateCarResponseDto {
  @ApiProperty({
    example: null,
  })
  deletedAt?: Date;

  @ApiProperty({
    example: true,
  })
  isAvailable: boolean;

  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'brand',
  })
  brand: string;

  @ApiProperty({
    example: 'description',
  })
  description: string;

  @ApiProperty({
    example: '111-XXX',
  })
  licensePlate: string;

  @ApiProperty({
    example: 'name',
  })
  name: string;

  @ApiProperty({
    example: 120.0,
  })
  dailyRate: number;

  @ApiProperty({
    example: null,
  })
  updatedAt?: Date;

  @ApiProperty({
    example: null,
  })
  createdAt?: Date;
}
