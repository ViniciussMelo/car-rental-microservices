import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { SequelizeConfigModule } from '@modules/database/mysql/sequelize-config-module.module';
import { ModulesModule } from '@modules/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SequelizeConfigModule,
    ModulesModule,
  ],
})
export class AppModule {}
