import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { Car } from '@modules/cars/models/car.model';
import { CAR_REPOSITORY } from '@shared/constants';
import { AppError } from '@shared/errors/app.error';

@Injectable()
export class CarService {
  constructor(
    @Inject(CAR_REPOSITORY)
    private readonly carsRepository: typeof Car,
  ) {}

  async create({ brand, description, licensePlate, name }: CreateCarDto) {
    const car = await this.carsRepository.findOne({
      where: {
        licensePlate,
      },
    });

    if (car) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a car with this license plate!',
      );
    }

    return;
  }
}
