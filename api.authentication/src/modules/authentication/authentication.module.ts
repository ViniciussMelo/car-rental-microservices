import { Module } from '@nestjs/common';

import { AuthenticationController } from '@modules/authentication/controllers/authentication.controller';
import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { User } from '@modules/authentication/models/user.model';
import { USER_REPOSITORY } from '@constants/index';

export const usersProviders = {
  provide: USER_REPOSITORY,
  useValue: User,
};

@Module({
  controllers: [AuthenticationController],
  providers: [AuthenticationService, usersProviders],
  exports: [AuthenticationService, usersProviders],
})
export class AuthenticationModule {}
