import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';

import { swaggerConfig } from '@configs/swagger/swagger.config';
import { AppModule } from './app.module';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3001;

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
