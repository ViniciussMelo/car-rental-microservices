import { Module } from '@nestjs/common';

import { RentalController } from '@modules/rental/controllers/rental.controller';
import { RentalService } from '@modules/rental/services/rental.service';
import { DatabaseModule } from '@modules/database/database.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [UsersModule, DatabaseModule],
  controllers: [RentalController],
  providers: [RentalService],
  exports: [RentalService],
})
export class RentalModule {}
