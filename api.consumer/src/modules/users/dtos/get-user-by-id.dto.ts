import { Expose, plainToInstance } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

import { GetRentalDto } from '@modules/rental/dtos/get-rental.dto';
import { GetUserDto } from '@modules/users/dtos/get-user.dto';

export class GetUserByIdDto extends GetUserDto {
  @ApiProperty({
    type: [GetRentalDto],
  })
  @Expose()
  rentals: GetRentalDto[];

  static factory(data: User) {
    const rentals = data.rentals.map((rental) => GetRentalDto.factory(rental));

    const dto = plainToInstance(GetUserByIdDto, data);

    dto.rentals = rentals;

    return dto;
  }
}
