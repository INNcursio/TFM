import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ComentarioController } from './comentario.controller';
import { ComentarioService } from './comentario.service';
import { ComentarioRepository } from './repositories/comentario.repository';
import { ComentarioMongoModel, ComentarioSchema } from './schema/comentario.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ComentarioMongoModel.name, schema: ComentarioSchema }]),
    ClientsModule.registerAsync([
      {
        name: 'NATS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.NATS,
          options: {
            servers: [configService.get<string>('NATS_URI')],
          },
        }),
      },
    ]),
  ],
  
  controllers: [ComentarioController],
  providers: [
    { provide: 'IComentarioService', useClass: ComentarioService },
    { provide: 'IComentarioRepository', useClass: ComentarioRepository },
  ],

  
  exports: ['IComentarioService'],
})
export class ComentarioModule {}
