import { Module } from '@nestjs/common';

import { CarController } from '@modules/cars/controllers/car.controller';
import { RedirectsModule } from '@modules/redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [CarController],
  providers: [],
  exports: [],
})
export class CarsModule {}
