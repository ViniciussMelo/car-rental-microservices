import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarController {
  @Get()
  async get() {
    return 'Hello!';
  }

  @Get('/test')
  async get2() {
    return 'Hello2!';
  }
}
