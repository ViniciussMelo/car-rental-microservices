import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';

@ApiSecurity('x-api-key')
@Controller('health')
@ApiTags('health')
export class HealthController {
  @Get()
  async health(): Promise<{ message: string }> {
    return { message: 'OK' };
  }
}
