import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  
  const app = await NestFactory.create(AppModule);

  const microserviceOptions: MicroserviceOptions = {
    transport: Transport.NATS,
    options: {
      servers: [process.env.NATS_URI],
    },
  };

  app.connectMicroservice(microserviceOptions);

  await app.startAllMicroservices();
  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`Event service is running on: ${await app.getUrl()}`);
}
bootstrap();
