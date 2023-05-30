import { Module } from '@nestjs/common';

import { UserController } from '@modules/users/controllers/user.controller';
import { UserService } from '@modules/users/services/user.service';
import { DatabaseModule } from '@modules/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UsersModule {}
