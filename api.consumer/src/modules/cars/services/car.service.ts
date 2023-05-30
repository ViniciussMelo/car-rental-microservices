import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '@modules/database/services/database.service';
import { GetByCarIdDto } from '@modules/cars/dtos/get-by-car-id.dto';

@Injectable()
export class CarService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getRentalsByCarId(carId: number): Promise<GetByCarIdDto> {
    const users = await this.databaseService.user.findMany({
      where: {
        rentals: {
          some: {
            carId,
          },
        },
      },
    });

    if (!users.length) {
      throw new NotFoundException();
    }

    return GetByCarIdDto.factory(users);
  }
}
