import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CAR_REPOSITORY, RENTAL_REPOSITORY } from '@shared/constants';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { Rental } from '@modules/rentals/models/rental.model';
import { RentalDto } from '@modules/rentals/dtos/rental.dto';
import { Car } from '@modules/cars/models/car.model';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class RentalService {
  constructor(
    @Inject(RENTAL_REPOSITORY)
    private readonly rentalRepository: typeof Rental,

    @Inject(CAR_REPOSITORY)
    private readonly carsRepository: typeof Car,
  ) {}

  async rentCar(user: IAuthUser, { carId }: RentalDto) {
    const userId = user.sub;

    const foundCar = await this.carsRepository.findOne({
      where: {
        id: carId,
      },
    });

    if (!foundCar) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Not found carId');
    }

    if (!foundCar.isAvailable) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'Car is unavailable');
    }

    const rentalOpenToUser = await this.rentalRepository.findOne({
      where: {
        userId,
        endDate: null,
      },
    });

    if (rentalOpenToUser) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'The user already have a rental in progress',
      );
    }

    await this.rentalRepository.create({
      userId,
      carId,
      startDate: new Date(),
    });

    await this.carsRepository.update(
      {
        isAvailable: false,
      },
      {
        where: {
          id: carId,
        },
      },
    );
  }
}
