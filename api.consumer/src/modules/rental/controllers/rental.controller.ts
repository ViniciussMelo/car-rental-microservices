import { EventPattern, Payload } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';

import {
  KAFKA_CAR_DEVOLUTION_TOPIC,
  KAFKA_CAR_RENTED_TOPIC,
} from '@shared/constants';
import { IRentalPayload } from '@modules/rental/interfaces/rental-payload.interface';
import { RentalService } from '@modules/rental/services/rental.service';

@Controller()
export class RentalController {
  constructor(private readonly rentalService: RentalService) {}

  @EventPattern(KAFKA_CAR_RENTED_TOPIC)
  async handleRentalCreated(@Payload('value') payload: IRentalPayload) {
    try {
      await this.rentalService.create(payload);
    } catch (error) {
      console.log('error: ', error);
    }
  }

  @EventPattern(KAFKA_CAR_DEVOLUTION_TOPIC)
  async handleRentalDevolution(@Payload('value') payload: IRentalPayload) {
    try {
      await this.rentalService.devolution(payload);
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
