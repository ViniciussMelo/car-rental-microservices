import { Body, Controller, Get, Post } from '@nestjs/common';

import { CreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { CarService } from '@modules/cars/services/car.service';

@Controller('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Get()
  async get() {
    return 'Hello!';
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }
}
