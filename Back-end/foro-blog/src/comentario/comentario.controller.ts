import { Body, Controller, Delete, Get, Param, Post, Put, Inject, UseGuards } from '@nestjs/common';
import { Comentario } from './domain/comentario.domain';
import { CreateComentarioDto } from './dtos/create-comentario-dto';
import { UpdateComentarioDto } from './dtos/update-comentario-dto';
import { IComentarioService } from './interfaces/comentario.service.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('comments')
export class ComentarioController {
  constructor(
    @Inject('IComentarioService') private readonly comentarioService: IComentarioService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    console.log(createComentarioDto);
    return this.comentarioService.create(createComentarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Comentario[]> {
    return this.comentarioService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Comentario> {
    return this.comentarioService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('post/:postId')
  async findByPostId(@Param('postId') postId: string): Promise<Comentario[]> {
    return this.comentarioService.findByPostId(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    console.log(updateComentarioDto);
    return this.comentarioService.update(id, updateComentarioDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.comentarioService.delete(id);
  }

  // Encotrar todos los comentarios de un autor.
  @UseGuards(JwtAuthGuard)
  @Get('autor/:authorId')
  async findByAuthorId(@Param('authorId') authorId: string): Promise<Comentario[]> {
    return this.comentarioService.findByAuthorId(authorId);
  }
}
