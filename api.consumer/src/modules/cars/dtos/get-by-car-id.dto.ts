import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { User } from '@prisma/client';

import { GetUserDto } from '@modules/users/dtos/get-user.dto';

export class GetByCarIdDto {
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
    type: [GetUserDto],
  })
  @Expose()
  users: GetUserDto[];

  static factory(data: User[]): GetByCarIdDto {
    const users = data.map(({ id, name, email }) => {
      return {
        id,
        name,
        email,
      };
    });

    return {
      carId: data[0].rentals[0].carId,
      licensePlate: data[0].rentals[0].licensePlate,
      users,
    };
  }
}
