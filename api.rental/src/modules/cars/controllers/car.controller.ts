import { Controller, Get } from '@nestjs/common';

@Controller('cars')
export class CarController {
  @Get()
  async get() {
    return 'Hello!';
  }
}
