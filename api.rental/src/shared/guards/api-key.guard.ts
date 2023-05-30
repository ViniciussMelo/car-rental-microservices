import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  private readonly allowedApiKeys: string[] = [
    process.env.API_GATEWAY_KEY,
    process.env.SWAGGER_API_KEY,
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['x-api-key'];

    return this.allowedApiKeys.includes(apiKey);
  }
}
