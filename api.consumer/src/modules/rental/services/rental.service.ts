import { Injectable } from '@nestjs/common';

import { IRentalCreatedPayload } from '@modules/rental/interfaces/rental-created.interface';
import { DatabaseService } from '@modules/database/services/database.service';
import { UserService } from '@modules/users/services/user.service';

@Injectable()
export class RentalService {
  constructor(
    private readonly databaseService: DatabaseService,

    private readonly userService: UserService,
  ) {}

  async create(payload: IRentalCreatedPayload) {
    let user = await this.databaseService.user.findFirst({
      where: {
        id: payload.user.sub,
      },
    });

    if (!user) {
      user = await this.userService.create(payload.user);
    }

    user.rentals.push({
      carId: payload.car.id,
      licensePlate: payload.car.licensePlate,
      startDate: new Date(payload.rent.startDate),
      total: 0,
      returnedDate: null,
    });

    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        rentals: user.rentals,
      },
    });
  }
}
