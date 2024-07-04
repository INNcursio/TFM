import { Controller, Inject, Post, Body, Get, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { Blog } from './domain/blog.domain';
import { CreateBlogDto } from './dtos/create-blog-dto';
import { UpdateBlogDto } from './dtos/update-blog-dto';
import { IBlogService } from './interfaces/blog.service.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('blogs')
export class BlogController {
  constructor(
    @Inject('IBlogService') private readonly blogService: IBlogService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
    return this.blogService.create(createBlogDto);
  }

  @Get()
  async findAll(): Promise<Blog[]> {
    return this.blogService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Blog> {
    return this.blogService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto): Promise<Blog> {
    return this.blogService.update(id, updateBlogDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.blogService.deleteBlog(id);
  }

  // Encontrar por usuario
  @UseGuards(JwtAuthGuard)
  @Get('usuario/:id')
  async findByUserId(@Param('id') id: string): Promise<Blog[]> {
    return this.blogService.findByUserId(id);
  }

  // Obtener todos los blogs dado sus ids:

  @Get('ids/:ids')
  async findByIds(@Param('ids') ids: string): Promise<Blog[]> {
    console.log('ids', ids)
    return this.blogService.findByIds(ids);
  }
}
