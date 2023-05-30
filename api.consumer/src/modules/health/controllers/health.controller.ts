import { ApiOkResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Controller, Get, HttpStatus } from '@nestjs/common';

import { HealthResponse } from '@modules/health/dtos/health-response.dto';

@ApiSecurity('x-api-key')
@Controller('health')
@ApiTags('health')
export class HealthController {
  @Get()
  @ApiOkResponse({ status: HttpStatus.OK, type: HealthResponse })
  async health(): Promise<{ message: string }> {
    return { message: 'OK' };
  }
}
