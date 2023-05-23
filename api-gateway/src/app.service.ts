import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async redirect(request: Request) {
    const endpoint = request.path;
    const targetUrl = this.getTargetUrl(endpoint);

    const response = await firstValueFrom(
      this.httpService.request({
        method: request.method,
        url: targetUrl,
        data: request.body,
        headers: request.headers,
      }),
    );

    return response.data;
  }

  private getTargetUrl(endpoint: string): string {
    if (endpoint.startsWith('/cars')) {
      return process.env.CARS_URL + endpoint;
    } else if (endpoint.startsWith('/consumer')) {
      return process.env.CONSUMER_URL + endpoint;
    }

    throw new NotFoundException();
  }
}
