import {
  All,
  Controller,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @All('*')
  async proxyRequest(@Req() request: Request): Promise<any> {
    try {
      return await this.appService.redirect(request);
    } catch (error) {
      console.log('error: ', error);

      throw new InternalServerErrorException();
    }
  }
}
