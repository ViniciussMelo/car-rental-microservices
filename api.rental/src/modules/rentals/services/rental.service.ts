import { HttpStatus, Inject, Injectable } from '@nestjs/common';

import { CAR_REPOSITORY, RENTAL_REPOSITORY } from '@shared/constants';
import { KafkaService } from '@modules/message/services/kafka.service';
import { IAuthUser } from '@shared/interfaces/auth-user.interface';
import { DateFormat } from '@shared/utils/date-format.shared';
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

    private readonly kafkaService: KafkaService,
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

    const rental = await this.rentalRepository.create({
      userId,
      carId,
      startDate: DateFormat.getDateWithoutMS(),
    });

    await this.updateAvailable(carId, false);

    this.kafkaService.emit(process.env.KAFKA_CAR_RENTED_TOPIC, {
      key: this.getKafkaKey(user.sub),
      value: {
        car: foundCar,
        user,
        rent: rental,
      },
    });
  }

  async devolution(user: IAuthUser, rentalId: number) {
    const foundRental = await this.rentalRepository.findOne({
      where: {
        id: rentalId,
        endDate: null,
      },
    });

    if (!foundRental) {
      throw new AppError(HttpStatus.NOT_FOUND, 'Rental not found');
    }

    const car = await this.carsRepository.findOne({
      where: {
        id: foundRental.carId,
      },
    });

    const dateNow = DateFormat.getDateWithoutMS();

    const elapsedDays = DateFormat.compareInDays(
      foundRental.startDate,
      dateNow,
    );

    const total = car.dailyRate * elapsedDays;

    await this.rentalRepository.update(
      {
        total,
        endDate: dateNow,
      },
      {
        where: {
          id: rentalId,
        },
      },
    );

    await this.updateAvailable(car.id, true);

    this.kafkaService.emit(process.env.KAFKA_CAR_DEVOLUTION_TOPIC, {
      key: this.getKafkaKey(user.sub),
      value: {
        car,
        user,
        rent: Object.assign(foundRental, { endDate: dateNow, total }),
      },
    });
  }

  private async updateAvailable(carId: number, isAvailable: boolean) {
    return this.carsRepository.update(
      {
        isAvailable,
      },
      {
        where: {
          id: carId,
        },
      },
    );
  }

  private getKafkaKey(userId: number): string {
    return `user-${userId}`;
  }
}
