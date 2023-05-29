import { Module } from '@nestjs/common';

import { DatabaseService } from '@modules/database/services/database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
