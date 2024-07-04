import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogMongoModel, BlogSchema } from './schema/blog.schema';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { BlogRepository } from './repository/blog.repository';
import { PostMongoModel, PostSchema } from '../post/schemas/post.schema';
import { PostService } from '../post/post.service';
import { PostRepository } from '../post/repositories/post.repository';
import { ComentarioRepository } from '../comentario/repositories/comentario.repository';
import { ComentarioMongoModel, ComentarioSchema } from '../comentario/schema/comentario.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogMongoModel.name, schema: BlogSchema },
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
  controllers: [BlogController],
  providers: [
    { provide: 'IBlogService', useClass: BlogService },
    { provide: 'IBlogRepository', useClass: BlogRepository },
    { provide: 'IPostService', useClass: PostService },
    { provide: 'IPostRepository', useClass: PostRepository },
    { provide: 'IComentarioRepository', useClass: ComentarioRepository },
  ],
  exports: ['IBlogRepository', 'IBlogService'],
})
export class BlogModule {}