import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ModulesModule],
  providers: [],
})
export class AppModule {}
