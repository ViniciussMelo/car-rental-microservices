import { Module } from '@nestjs/common';

import { CarController } from '@cars/controllers/car.controller';
import { RedirectsModule } from '@redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [CarController],
  providers: [],
  exports: [],
})
export class CarsModule {}
