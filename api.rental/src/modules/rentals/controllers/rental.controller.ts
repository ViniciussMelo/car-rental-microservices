import {
  Body,
  Controller,
  Headers,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';

import { RentalResponseDto } from '@modules/rentals/dtos/rental-response.dto';
import { RentalService } from '@modules/rentals/services/rental.service';
import { RentalDto } from '@modules/rentals/dtos/rental.dto';
import { HeaderDto } from '@shared/dtos/header.dto';

@ApiSecurity('x-api-key')
@Controller('rental')
@ApiTags('rental')
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @Post()
  @ApiCreatedResponse({ status: HttpStatus.CREATED, type: RentalResponseDto })
  rentCar(@Headers() headers: HeaderDto, @Body() rentalDto: RentalDto) {
    return this.rentalService.rentCar(headers.user, rentalDto);
  }

  @Post('/:rentalId')
  @ApiOkResponse({ status: HttpStatus.OK })
  devolution(
    @Headers() headers: HeaderDto,
    @Param('rentalId') rentalId: number,
  ) {
    return this.rentalService.devolution(headers.user, rentalId);
  }
}
