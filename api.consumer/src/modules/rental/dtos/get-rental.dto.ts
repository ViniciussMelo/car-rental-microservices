import { Expose, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Rental } from '@prisma/client';

export class GetRentalDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  carId: number;

  @ApiProperty({
    example: 'XXX-XXX',
  })
  @Expose()
  licensePlate: string;

  @ApiProperty({
    example: new Date(),
  })
  @Expose()
  startDate: Date;

  @ApiProperty({
    example: new Date(),
  })
  @Expose()
  returnedDate: Date;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  total: number;

  static factory(data: Rental) {
    return plainToInstance(GetRentalDto, data, {
      excludeExtraneousValues: true,
    });
  }
}
