import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CarService } from '@modules/cars/services/car.service';

@Controller('car')
@ApiTags('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get('/:carId')
  getByCarId(@Param('carId') carId: number) {
    return this.carService.getRentalsByCarId(carId);
  }
}
