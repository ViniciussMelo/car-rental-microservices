import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class RedirectService {
  constructor(private readonly httpService: HttpService) {}

  async redirect(request: Request, url: string) {
    const response = await firstValueFrom(
      this.httpService.request({
        method: request.method,
        url,
        data: request.body,
        headers: request.headers,
      }),
    );

    return response.data;
  }
}
