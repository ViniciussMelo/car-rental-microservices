import { Module } from '@nestjs/common';

import { CarController } from '@modules/cars/controllers/car.controller';
import { DatabaseModule } from '@modules/database/database.module';
import { CarService } from '@modules/cars/services/car.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarsModule {}
