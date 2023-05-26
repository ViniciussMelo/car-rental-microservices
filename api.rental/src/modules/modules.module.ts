import { Module } from '@nestjs/common';

import { SequelizeConfigModule } from '@modules/database/mysql/sequelize-config-module.module';
import { RentalsModule } from '@modules/rentals/rentals.module';
import { HealthModule } from '@modules/health/health.module';
import { CarsModule } from '@modules/cars/cars.module';

@Module({
  imports: [SequelizeConfigModule, HealthModule, CarsModule, RentalsModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
