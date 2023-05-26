import { Module } from '@nestjs/common';

import { RentalController } from '@modules/rentals/controllers/rental.controller';
import { RentalService } from '@modules/rentals/services/rental.service';
import { MessageModule } from '@modules/message/message.module';
import { carProvider, rentalProvider } from '@shared/providers';

@Module({
  imports: [MessageModule],
  controllers: [RentalController],
  providers: [RentalService, rentalProvider, carProvider],
  exports: [RentalService, rentalProvider, carProvider],
})
export class RentalsModule {}
