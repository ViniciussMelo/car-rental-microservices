import { Module } from '@nestjs/common';

import { SequelizeConfigModule } from '@modules/database/sequelize-config-module.module';
import { HealthModule } from '@modules/health/health.module';

@Module({
  imports: [SequelizeConfigModule, HealthModule],
})
export class ModulesModule {}
