import { Module } from '@nestjs/common';

import { HealthModule } from '@modules/health/health.module';
import { CarsModule } from '@modules/cars/cars.module';

@Module({
  imports: [HealthModule, CarsModule],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
