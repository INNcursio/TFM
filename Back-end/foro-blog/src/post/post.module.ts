import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './repositories/post.repository';
import { PostMongoModel, PostSchema } from './schemas/post.schema';
import { ComentarioMongoModel, ComentarioSchema } from '../comentario/schema/comentario.schema';
import { ComentarioRepository } from '../comentario/repositories/comentario.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostMongoModel.name, schema: PostSchema },
      { name: ComentarioMongoModel.name, schema: ComentarioSchema },
    ]),
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
  controllers: [PostController],
  providers: [
    { provide: 'IPostService', useClass: PostService },
    { provide: 'IPostRepository', useClass: PostRepository },
    { provide: 'IComentarioRepository', useClass: ComentarioRepository}
  ],
  exports: ['IPostService'],
})
export class PostModule {}
