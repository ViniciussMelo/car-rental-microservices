import { All, Controller, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';

import { RedirectService } from '@modules/redirects/services/redirect.service';
import { JwtAuthGuard } from '@shared/guards/jwt-auth.guard';

@Controller('consumer')
@UseGuards(JwtAuthGuard)
export class ConsumerController {
  constructor(private readonly redirectService: RedirectService) {}

  @All('*')
  async allRoutes(@Req() request: Request) {
    return this.redirect(request);
  }

  @All()
  async proxyRequest(@Req() request: Request): Promise<any> {
    return this.redirect(request);
  }

  private async redirect(@Req() request: Request) {
    const endpoint = request.path;
    const url = process.env.CONSUMER_URL + endpoint;

    return this.redirectService.redirect(request, url);
  }
}
