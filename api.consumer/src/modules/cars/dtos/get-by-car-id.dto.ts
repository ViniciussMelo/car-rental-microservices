import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Rental, User } from '@prisma/client';

import { GetUserDto } from '@modules/users/dtos/get-user.dto';

class GetUserDtoByCarId extends GetUserDto {
  @ApiProperty({
    example: 1,
  })
  @Expose()
  rentedTimes: number;

  @ApiProperty({
    example: 100,
  })
  @Expose()
  amount: number;
}
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
    type: [GetUserDtoByCarId],
  })
  @Expose()
  users: GetUserDtoByCarId[];

  static factory(data: User[], carId: number): GetByCarIdDto {
    const users: GetUserDtoByCarId[] = data.map(
      ({ id, name, email, rentals }) => {
        const userRentals = rentals.filter((rental) => rental.carId === carId);

        return {
          id,
          name,
          email,
          amount: userRentals
            .map((rental) => rental.total)
            .reduce((prev, next) => prev + next),
          rentedTimes: userRentals.length,
        };
      },
    );

    const carRental = data[0].rentals.find((rental) => rental.carId === carId);

    return {
      carId: carRental.carId,
      licensePlate: carRental.licensePlate,
      users,
    };
  }
}
