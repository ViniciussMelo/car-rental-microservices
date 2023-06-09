import { CacheModule, Module } from '@nestjs/common';

import { SequelizeConfigModule } from '@modules/database/sequelize-config-module.module';
import { AuthenticationModule } from '@modules/authentication/authentication.module';
import { HealthModule } from '@modules/health/health.module';
import { UserModule } from '@modules/user/user.module';

@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    SequelizeConfigModule,
    AuthenticationModule,
    UserModule,
    HealthModule,
  ],
})
export class ModulesModule {}
