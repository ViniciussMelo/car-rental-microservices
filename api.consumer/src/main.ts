import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';
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

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.setGlobalPrefix(process.env.API_PREFIX);

  await swaggerConfig(app, []);

  const port = process.env.PORT || 3002;

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers: [process.env.KAFKA_BROKERS],
      },
      consumer: {
        groupId:
          process.env.NODE_ENV === 'DEVELOPMENT'
            ? process.env.KAFKA_GROUP_ID + new Date().getMilliseconds()
            : process.env.KAFKA_GROUP_ID,
      },
    },
  });

  await app.startAllMicroservices().then(() => {
    console.log('[Consumer] Microservice running!');
  });

  await app
    .listen(port)
    .then(() => console.log(`Application running at port: ${port}`));
}
bootstrap();
