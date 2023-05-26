import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';

import { IPaginationResponse } from '@shared/interfaces/pagination-response.interface';
import { BasePaginationService } from '@shared/services/base-pagination.service';
import { CreateCarDto } from '@modules/cars/dtos/create-car.dto';
import { PaginationDto } from '@shared/dtos/pagination.dto';
import { Car } from '@modules/cars/models/car.model';
import { AppError } from '@shared/errors/app.error';
import { CAR_REPOSITORY } from '@shared/constants';

@Injectable()
export class CarService extends BasePaginationService<Car> {
  constructor(
    @Inject(CAR_REPOSITORY)
    private readonly carsRepository: typeof Car,
  ) {
    super();
  }

  async create({
    brand,
    description,
    licensePlate,
    name,
    dailyRate,
  }: CreateCarDto): Promise<Car> {
    const carWithSameLicensePlate = await this.carsRepository.findOne({
      where: {
        licensePlate,
      },
    });

    if (carWithSameLicensePlate) {
      throw new AppError(
        HttpStatus.CONFLICT,
        'Already exists a car with this license plate!',
      );
    }

    return this.carsRepository.create({
      brand,
      description,
      licensePlate,
      name,
      dailyRate,
    });
  }

  async getAll(
    paginationDto: PaginationDto,
    where: WhereOptions<Car> = {},
  ): Promise<IPaginationResponse<Car>> {
    const { orderBy, orderDirection, pageNumber, pageSize } =
      PaginationDto.factory(paginationDto);

    const totalPromise = this.carsRepository.count();
    const dataPromise = this.carsRepository.findAll({
      where,
      order: [[orderBy, orderDirection]],
      offset: (pageNumber - 1) * pageSize,
      limit: pageSize,
    });

    const [total, data] = await Promise.all([totalPromise, dataPromise]);

    return this.paginate(total, data.length, pageNumber, pageSize, data);
  }
}
