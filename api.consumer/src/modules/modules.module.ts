import { Module } from '@nestjs/common';

import { DatabaseModule } from '@modules/database/database.module';
import { RentalModule } from '@modules/rental/rental.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule, RentalModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
