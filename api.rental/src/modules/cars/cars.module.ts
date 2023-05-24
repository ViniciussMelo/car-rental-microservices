import { Module } from '@nestjs/common';
import { CarController } from './controllers/car.controller';

@Module({
  imports: [],
  controllers: [CarController],
  providers: [],
})
export class CarsModule {}
