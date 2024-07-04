import { ClientProxy } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { IPostService } from '../post/interfaces/post.service.interface';
import { BlogService } from './blog.service';
import { Blog } from './domain/blog.domain';
import { CreateBlogDto } from './dtos/create-blog-dto';
import { UpdateBlogDto } from './dtos/update-blog-dto';
import { IBlogRepository } from './interfaces/blog.repository.interface';

describe('BlogService', () => {
  let service: BlogService;
  let blogRepository: IBlogRepository;
  let postService: IPostService;
  let client: ClientProxy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogService,
        {
          provide: 'IBlogRepository',
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            findByUserId: jest.fn(),
          },
        },
        {
          provide: 'IPostService',
          useValue: {
            borrarTodosLosPostAlBlog: jest.fn(),
          },
        },
        {
          provide: 'NATS_SERVICE',
          useValue: {
            emit: jest.fn(),
            connect: jest.fn().mockReturnValue(Promise.resolve()),
          },
        },
      ],
    }).compile();

    service = module.get<BlogService>(BlogService);
    blogRepository = module.get<IBlogRepository>('IBlogRepository');
    postService = module.get<IPostService>('IPostService');
    client = module.get<ClientProxy>('NATS_SERVICE');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a blog and emit an event', async () => {
    const createBlogDto: CreateBlogDto = { titulo: 'Test Blog', descripcion: 'Test', autor: 'Author', usuarioId: '1', categoria: 'Tech' };
    const blog: Blog = new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech');

    jest.spyOn(blogRepository, 'create').mockResolvedValue(blog);
    jest.spyOn(client, 'emit').mockImplementation();

    const result = await service.create(createBlogDto);

    expect(result).toEqual(blog);
    expect(client.emit).toHaveBeenCalledWith('blog_created', blog);
  });

  it('should find all blogs', async () => {
    const blogs: Blog[] = [new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech')];

    jest.spyOn(blogRepository, 'findAll').mockResolvedValue(blogs);

    const result = await service.findAll();

    expect(result).toEqual(blogs);
  });

  it('should find a blog by id', async () => {
    const blog: Blog = new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech');

    jest.spyOn(blogRepository, 'findById').mockResolvedValue(blog);

    const result = await service.findById('1');

    expect(result).toEqual(blog);
  });

  it('should update a blog and emit an event', async () => {
    const updateBlogDto: UpdateBlogDto = { titulo: 'Updated Blog', descripcion: 'Updated' };
    const blog: Blog = new Blog('1', 'Updated Blog', 'Updated', 'Author', '1', [], new Date(), 'Tech');

    jest.spyOn(blogRepository, 'findById').mockResolvedValue(blog);
    jest.spyOn(client, 'emit').mockImplementation();

    const result = await service.update('1', updateBlogDto);

    expect(result).toEqual(blog);
    expect(client.emit).toHaveBeenCalledWith('blog_updated', blog);
  });

  it('should delete a blog, delete related posts, and emit an event', async () => {
    const blog: Blog = new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech');

    jest.spyOn(blogRepository, 'findById').mockResolvedValue(blog);
    jest.spyOn(postService, 'borrarTodosLosPostAlBlog').mockResolvedValue();
    jest.spyOn(blogRepository, 'delete').mockResolvedValue();
    jest.spyOn(client, 'emit').mockImplementation();

    await service.deleteBlog('1');

    expect(postService.borrarTodosLosPostAlBlog).toHaveBeenCalledWith(blog.id);
    expect(blogRepository.delete).toHaveBeenCalledWith(blog.id);
    expect(client.emit).toHaveBeenCalledWith('blog_deleted', blog);
  });

  it('should find blogs by user id', async () => {
    const blogs: Blog[] = [new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech')];

    jest.spyOn(blogRepository, 'findByUserId').mockResolvedValue(blogs);

    const result = await service.findByUserId('1');

    expect(result).toEqual(blogs);
  });

  it('should find blogs by ids', async () => {
    const blog: Blog = new Blog('1', 'Test Blog', 'Test', 'Author', '1', [], new Date(), 'Tech');
    const ids = '1,2,3';

    jest.spyOn(blogRepository, 'findById').mockResolvedValue(blog);

    const result = await service.findByIds(ids);

    expect(result).toEqual([blog, blog, blog]);
  });
});
