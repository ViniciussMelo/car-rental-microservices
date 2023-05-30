import { Injectable } from '@nestjs/common';

import { IRentalPayload } from '@modules/rental/interfaces/rental-payload.interface';
import { DatabaseService } from '@modules/database/services/database.service';
import { UserService } from '@modules/users/services/user.service';
import { DateFormat } from '@shared/utils/date-format.utils';

@Injectable()
export class RentalService {
  constructor(
    private readonly databaseService: DatabaseService,

    private readonly userService: UserService,
  ) {}

  async create(payload: IRentalPayload) {
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

  async devolution(payload: IRentalPayload) {
    const user = await this.databaseService.user.findFirst({
      where: {
        id: payload.user.sub,
      },
    });

    if (!user) {
      throw new Error(`User ${payload.user.sub} not found!`);
    }

    const foundRental = user.rentals.find((rental) => {
      const payloadUTCDate = DateFormat.convertToUTC(
        new Date(payload.rent.startDate),
      );
      const rentalUTCDate = DateFormat.convertToUTC(new Date(rental.startDate));

      if (
        rental.carId === payload.car.id &&
        rentalUTCDate === payloadUTCDate &&
        !rental.returnedDate
      ) {
        return true;
      }
      return false;
    });

    if (!foundRental) {
      throw new Error(`Rental not found for user ${payload.user.sub}`);
    }

    foundRental.returnedDate = new Date(payload.rent.endDate);
    foundRental.total = payload.rent.total;

    await this.databaseService.user.update({
      where: { id: user.id },
      data: {
        rentals: user.rentals,
      },
    });
  }
}
