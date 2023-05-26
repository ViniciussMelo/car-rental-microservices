import { Module } from '@nestjs/common';

import { RentalController } from '@modules/rentals/controllers/rental.controller';
import { RentalService } from '@modules/rentals/services/rental.service';
import { carProvider, rentalProvider } from '@shared/providers';

@Module({
  imports: [],
  controllers: [RentalController],
  providers: [RentalService, rentalProvider, carProvider],
  exports: [RentalService, rentalProvider, carProvider],
})
export class RentalsModule {}
