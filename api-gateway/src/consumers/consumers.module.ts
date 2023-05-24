import { Module } from '@nestjs/common';

import { ConsumerController } from '@consumers/controllers/consumer.controller';
import { RedirectsModule } from '@redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [ConsumerController],
  providers: [],
  exports: [],
})
export class ConsumersModule {}
