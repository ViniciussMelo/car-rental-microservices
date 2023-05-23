import { Module } from '@nestjs/common';

import { HealthModule } from '@modules/health/health.module';

@Module({
  controllers: [],
  providers: [],
  imports: [HealthModule],
})
export class ModulesModule {}
