import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Car name',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Car description',
  })
  description: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '999-XXX',
  })
  licensePlate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: 'Car brand',
  })
  brand: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    example: 10.0,
  })
  dailyRate: number;
}
