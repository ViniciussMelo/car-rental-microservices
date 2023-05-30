import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';

import { IPaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { CreateCarResponseDto } from '@modules/cars/dtos/create-car-response.dto';
import { GetCarResponseDto } from '@modules/cars/dtos/get-car-response.dto';
import { CreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { CarService } from '@modules/cars/services/car.service';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { Car } from '@modules/cars/models/car.model';

@ApiSecurity('x-api-key')
@Controller('cars')
@ApiTags('cars')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @Post()
  @ApiCreatedResponse({
    type: CreateCarResponseDto,
    status: HttpStatus.CREATED,
  })
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto);
  }

  @Get()
  @ApiOkResponse({ type: GetCarResponseDto, status: HttpStatus.OK })
  get(
    @Query() queryParams: PaginationDto,
  ): Promise<IPaginationResponse<CreateCarResponseDto>> {
    return this.carService.getAll(queryParams);
  }

  @Get('/available')
  @ApiOkResponse({ type: GetCarResponseDto, status: HttpStatus.OK })
  getAvailableCars(@Query() queryParams: PaginationDto) {
    return this.carService.getAll(queryParams, { isAvailable: true });
  }
}
