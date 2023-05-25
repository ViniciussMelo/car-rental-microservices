import { All, Controller, Req } from '@nestjs/common';
import { Request } from 'express';

import { RedirectService } from '@redirects/services/redirect.service';

@Controller('consumer')
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
