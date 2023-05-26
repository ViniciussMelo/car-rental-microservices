import { Module } from '@nestjs/common';

import { CarController } from '@modules/cars/controllers/car.controller';
import { CarService } from '@modules/cars/services/car.service';
import { carProvider } from '@shared/providers';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [CarService, carProvider],
  exports: [CarService, carProvider],
})
export class CarsModule {}
