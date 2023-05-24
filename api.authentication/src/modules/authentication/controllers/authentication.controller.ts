import { Body, Controller, Post } from '@nestjs/common';

import { AuthenticationService } from '@modules/authentication/services/authentication.service';
import { RegisterUserDto, LoginDto } from '@modules/authentication/dtos';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authenticationService.create(registerUserDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this.authenticationService.login(loginDto);
  }
}
