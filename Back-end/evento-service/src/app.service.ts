import { Injectable, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport, EventPattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService implements OnModuleInit {
  private client: ClientProxy;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.NATS,
      options: {
        servers: [this.configService.get<string>('NATS_URI')],
      },
    });

    this.client.connect().then(() => {
      console.log('Connected to NATS');
    }).catch((err) => {
      console.error('Error connecting to NATS', err);
    });
  }

}
