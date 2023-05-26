import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { swaggerConfig } from '@configs/swagger/swagger.config';
import { ApiKeyGuard } from '@shared/guards/api-key.guard';
import { AppModule } from './app.module';
import { ErrorInterceptor } from '@shared/interceptors/error.interceptor';
import { HeadersInterceptor } from '@shared/interceptors/headers.interceptor';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalGuards(new ApiKeyGuard(), new HeadersInterceptor());

  app.setGlobalPrefix(process.env.API_PREFIX);

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3001;

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
