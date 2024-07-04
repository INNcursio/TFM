import { Injectable, Inject } from "@nestjs/common";
import { Blog } from "./domain/blog.domain";
import { CreateBlogDto } from "./dtos/create-blog-dto";
import { UpdateBlogDto } from "./dtos/update-blog-dto";
import { IBlogRepository } from "./interfaces/blog.repository.interface";
import { IPostService } from "../post/interfaces/post.service.interface";
import { ClientProxy } from "@nestjs/microservices";


@Injectable()
export class BlogService {
  constructor(
    @Inject('IBlogRepository') private readonly blogRepository: IBlogRepository,
    @Inject('IPostService') private readonly postService: IPostService,
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {
    this.client.connect().then(() => {
    }).catch((err) => {
      console.error('Error connecting to NATS', err);
    });
  }

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.create(createBlogDto);
    console.log('blog-created', blog)
    this.client.emit('blog_created', blog); // Emitir evento
    console.log('evento emitido')
    return blog;
  }

  async findAll(): Promise<Blog[]> {
    return this.blogRepository.findAll();
  }

  async findById(id: string): Promise<Blog> {
    return this.blogRepository.findById(id);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const blog = await this.blogRepository.findById(id);
    console.log('blog-update', blog)
    this.client.emit('blog_updated', blog); // Emitir evento
    return blog;
  }

  async deleteBlog(id: string): Promise<void> {
    const blog = await this.blogRepository.findById(id);
    await this.postService.borrarTodosLosPostAlBlog(blog.id);
    await this.blogRepository.delete(id);
    this.client.emit('blog_deleted', blog); // Emitir evento
  }

  // Encontrar por usuario
  async findByUserId(id: string): Promise<Blog[]> {
    return this.blogRepository.findByUserId(id);
  }

  // Obtener todos los blogs dado sus ids:
  async findByIds(ids: string): Promise<Blog[]> {
    // sin crear el metodo en el repositorio
    console.log('ids', ids)
    console.log(ids)
    if (!ids) {
      throw new Error('No se han proporcionado ids');
    }
    const idsArray = ids.split(',');
    const listBlogs = [];
    for (const id of idsArray) {
      const blog = await this.blogRepository.findById(id);
      console.log(blog)
      if (!blog) {
        throw new Error(`Blog con id ${id} no encontrado`);
      }
      listBlogs.push(blog);
    }

    return listBlogs;
  }
}
