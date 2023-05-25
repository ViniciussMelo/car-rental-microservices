import { Module } from '@nestjs/common';

import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { ConsumersModule } from '@modules/consumers/consumers.module';
import { RedirectsModule } from '@modules/redirects/redirects.module';
import { HealthModule } from '@modules/health/health.module';
import { CarsModule } from '@modules/cars/cars.module';

@Module({
  imports: [
    RedirectsModule,
    AuthenticationModule,
    CarsModule,
    ConsumersModule,
    HealthModule,
  ],
  controllers: [],
  providers: [],
})
export class ModulesModule {}
