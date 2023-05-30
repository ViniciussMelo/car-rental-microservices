import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/database.module';
import { RentalModule } from '@modules/rental/rental.module';
import { UsersModule } from '@modules/users/users.module';
import { CarsModule } from '@modules/cars/cars.module';

@Module({
  imports: [DatabaseModule, UsersModule, RentalModule, CarsModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
