import { Module } from '@nestjs/common';

import { ConsumerController } from '@modules/consumers/controllers/consumer.controller';
import { RedirectsModule } from '@modules/redirects/redirects.module';

@Module({
  imports: [RedirectsModule],
  controllers: [ConsumerController],
  providers: [],
  exports: [],
})
export class ConsumersModule {}
