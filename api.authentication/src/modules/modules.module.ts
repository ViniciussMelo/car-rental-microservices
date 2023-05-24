import { CacheModule, Module } from '@nestjs/common';

import { SequelizeConfigModule } from '@modules/database/sequelize-config-module.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { HealthModule } from '@modules/health/health.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    AuthenticationModule,
    SequelizeConfigModule,
    HealthModule,
  ],
})
export class ModulesModule {}
