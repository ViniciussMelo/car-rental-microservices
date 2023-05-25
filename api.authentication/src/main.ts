import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { swaggerConfig } from '@configs/swagger/swagger.config';
import { AppModule } from './app.module';

dotenv.config();

async function bootstrap() {
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

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3003;

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
