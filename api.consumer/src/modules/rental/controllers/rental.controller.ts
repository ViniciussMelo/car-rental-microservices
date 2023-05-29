import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import { IRentalCreatedPayload } from '@modules/rental/interfaces/rental-created.interface';
import { RentalService } from '@modules/rental/services/rental.service';
import { KAFKA_CAR_RENTED_TOPIC } from '@shared/constants';

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @EventPattern(KAFKA_CAR_RENTED_TOPIC)
  async handleRentalCreated(@Payload('value') payload: IRentalCreatedPayload) {
    try {
      await this.rentalService.create(payload);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
