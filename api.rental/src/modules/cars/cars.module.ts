import { Module } from '@nestjs/common';

import { CarController } from '@modules/cars/controllers/car.controller';
import { CarService } from '@modules/cars/services/car.service';
import { Car } from '@modules/cars/models/car.model';
import { CAR_REPOSITORY } from '@shared/constants';

export const carProvider = {
  provide: CAR_REPOSITORY,
  useValue: Car,
};

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, carProvider],
  exports: [CarService, carProvider],
})
export class CarsModule {}
