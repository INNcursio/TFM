import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { BlogService } from './blog.service';
import { BlogRepository } from './repository/blog.repository';
import { BlogMongoModel, BlogSchema } from './schema/blog.schema';
import { PostService } from '../post/post.service';
import { PostRepository } from '../post/repositories/post.repository';
import { PostMongoModel, PostSchema } from '../post/schemas/post.schema';
import { ComentarioRepository } from '../comentario/repositories/comentario.repository';
import { ComentarioMongoModel, ComentarioSchema } from '../comentario/schema/comentario.schema';
import { UsuarioService } from '../usuario/usuario.service';
import { UsuarioMongoModel, UsuarioSchema } from '../usuario/schema/usuario.schema';
import { BlogController } from './blog.controller';
import { BlogModule } from './blog.module';
import { PostModule } from '../post/post.module';
import { ComentarioModule } from '../comentario/comentario.module';
import { UsuarioModule } from '../usuario/usuario.module';
import { UsuarioRepository } from '../usuario/repository/usuario.repository';
import { AuthModule } from '../auth/auth.module';

describe('BlogService', () => {
  let app: INestApplication;
  let blogService: BlogService;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.test' }),
        MongooseModule.forRoot(process.env.MONGO_URI),
        MongooseModule.forFeature([
          { name: BlogMongoModel.name, schema: BlogSchema },
          { name: PostMongoModel.name, schema: PostSchema },
          { name: ComentarioMongoModel.name, schema: ComentarioSchema },
          { name: UsuarioMongoModel.name, schema: UsuarioSchema },
        ]),
        BlogModule,
        PostModule,
        ComentarioModule,
        UsuarioModule,
        AuthModule,
      ],
      controllers: [BlogController],
      providers: [
        BlogService,
        BlogRepository,
        PostService,
        PostRepository,
        ComentarioRepository,
        UsuarioService,
        {
          provide: 'NATS_SERVICE',
          useFactory: (configService: ConfigService) => {
            return ClientProxyFactory.create({
              transport: Transport.NATS,
              options: {
                servers: [configService.get<string>('NATS_URI')],
              },
            });
          },
          inject: [ConfigService],
        },
        { provide: 'IBlogService', useClass: BlogService },
        { provide: 'IBlogRepository', useClass: BlogRepository },
        { provide: 'IPostService', useClass: PostService },
        { provide: 'IPostRepository', useClass: PostRepository },
        { provide: 'IComentarioRepository', useClass: ComentarioRepository },
        { provide: 'IUsuarioService', useClass: UsuarioService },
        { provide: 'IUsuarioRepository', useClass: UsuarioRepository },
      ],
    }).compile();
    
    app = moduleFixture.createNestApplication();
    await app.init();
  
    blogService = moduleFixture.get<BlogService>('IBlogService');
    console.log('blogService', blogService);
  
    const createUserDto = {
      nombre: 'Test User',
      email: 'testuser@example.com',
      password: 'testpassword',
    };
  
    await request(app.getHttpServer())
      .post('/usuarios')
      .send(createUserDto)
      .expect(201);
  
    const loginResponse = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: createUserDto.email, password: createUserDto.password })
      .expect(201);
    
    jwtToken = loginResponse.body.access_token;
    console.log('jwtToken', jwtToken);
  });
  
  afterAll(async () => {
    await app.close();
  });
  
  it('should create a blog', async () => {
    const createBlogDto = {
      titulo: 'Test Blog',
      descripcion: 'This is a test blog',
      autor: 'Author',
      usuarioId: 'someUserId',
      categoria: 'Actualidad',
    };
  
    const response = await request(app.getHttpServer())
      .post('/blogs')
      .set('Authorization', `Bearer ${jwtToken}`)
      .send(createBlogDto)
      .expect(201);
  
    expect(response.body).toMatchObject(createBlogDto);
  });
  
  it('should retrieve all blogs', async () => {
    const response = await request(app.getHttpServer())
      .get('/blogs')
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  
    console.log('response.body', response.body);
    expect(response.body).toBeInstanceOf(Array);
  });

});
  