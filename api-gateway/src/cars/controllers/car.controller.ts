import { All, Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';

import { RedirectService } from '@redirects/services/redirect.service';

@Controller('cars')
export class CarController {
  constructor(private readonly redirectService: RedirectService) {}
  @All('*')
  async allRoutes(@Req() request: Request) {
    return this.redirect(request);
  }

  @All()
  async carsRoute(@Req() request: Request): Promise<any> {
    return this.redirect(request);
  }

  private async redirect(@Req() request: Request) {
    const endpoint = request.path;
    const url = process.env.CARS_URL + endpoint;

    return this.redirectService.redirect(request, url);
  }
}
