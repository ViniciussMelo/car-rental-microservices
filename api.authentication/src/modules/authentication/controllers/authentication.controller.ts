import { Controller, Post } from '@nestjs/common';

@Controller('authentication')
export class AuthenticationController {
  @Post('/register')
  async register() {
    //
  }

  @Post('/login')
  async login() {
    //
  }
}
