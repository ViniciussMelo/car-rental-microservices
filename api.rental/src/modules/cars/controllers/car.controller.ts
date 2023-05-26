import { Body, Controller, Get, Post, Query } from '@nestjs/common';

import { IPaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { CreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { CarService } from '@modules/cars/services/car.service';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { Car } from '@modules/cars/models/car.model';
import { ApiTags } from '@nestjs/swagger';

@Controller('cars')
@ApiTags('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  get(@Query() queryParams: PaginationDto): Promise<IPaginationResponse<Car>> {
    return this.carService.getAll(queryParams);
  }

  @Get('/available')
  getAvailableCars(@Query() queryParams: PaginationDto) {
    return this.carService.getAll(queryParams, { available: true });
  }
}
