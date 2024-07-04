import { Body, Controller, Delete, Get, Param, Post, Put, Inject, UseGuards } from '@nestjs/common';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { IPostService } from './interfaces/post.service.interface';
import { Post as Publicacion } from './domain/post.domain';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostController {
  constructor(
    @Inject('IPostService') private readonly postService: IPostService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<Publicacion> {
    console.log('crear post', createPostDto);
    return this.postService.create(createPostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Publicacion[]> {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Publicacion> {
    return this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('blog/:blogId')
  async findByBlogId(@Param('blogId') blogId: string): Promise<Publicacion[]> {
    return this.postService.findByBlogId(blogId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto): Promise<Publicacion> {
    return this.postService.update(id, updatePostDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.postService.deletePost(id);
  }

  // Encotrar todos los post de un autor.
  @UseGuards(JwtAuthGuard)
  @Get('autor/:autorId')
  async findByAutorId(@Param('autorId') autorId: string): Promise<Publicacion[]> {
    return this.postService.findByAuthorId(autorId);
  }
}
