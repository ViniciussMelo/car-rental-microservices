import { Module } from '@nestjs/common';

import { databaseProviders } from '@modules/database/mysql/providers/database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class SequelizeConfigModule {}
