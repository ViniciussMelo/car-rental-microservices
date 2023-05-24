import { Module } from '@nestjs/common';

import { ConsumersModule } from '@consumers/consumers.module';
import { RedirectsModule } from '@redirects/redirects.module';
import { HealthModule } from '@health/health.module';
import { CarsModule } from '@cars/cars.module';

@Module({
  imports: [RedirectsModule, CarsModule, ConsumersModule, HealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
