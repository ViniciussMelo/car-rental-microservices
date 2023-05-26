import { Body, Controller, Headers, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { RentalService } from '@modules/rentals/services/rental.service';
import { RentalDto } from '@modules/rentals/dtos/rental.dto';
import { HeaderDto } from '@shared/dtos/header.dto';

@Controller('rental')
@ApiTags('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  rentCar(@Headers() headers: HeaderDto, @Body() rentalDto: RentalDto) {
    return this.rentalService.rentCar(headers.user, rentalDto);
  }
}
