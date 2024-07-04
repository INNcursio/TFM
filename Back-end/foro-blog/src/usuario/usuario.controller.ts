import { Body, Controller, Delete, Get, Param, Post, Put, Inject, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { UpdateUserDto } from './dtos/update-user-dto';
import { IUsuarioService } from './interfaces/usuario.servicio.interface';
import { UsuarioMongoModel } from './schema/usuario.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('usuarios')
export class UsuarioController {
  constructor(
    @Inject('IUsuarioService') private readonly usuarioService: IUsuarioService,
  ) {}

  @Post()
  async crearUsuario(@Body() createUserDto: CreateUserDto): Promise<UsuarioMongoModel> {
    return this.usuarioService.crearUsuario(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async encontrarTodosUsuarios(): Promise<UsuarioMongoModel[]> {
    return this.usuarioService.encontrarTodosUsuarios();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async encontrarPorId(@Param('id') id: string): Promise<UsuarioMongoModel> {
    return this.usuarioService.encontrarPorId(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('email/:email')
  async encontarPorEmail(@Param('email') email: string): Promise<UsuarioMongoModel> {
    return this.usuarioService.encontarPorEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async actualizarUsuario(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<UsuarioMongoModel> {
    return this.usuarioService.actualizarUsuario(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async borrarUsuario(@Param('id') id: string): Promise<void> {
    return this.usuarioService.borrarUsuario(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/agregar-blog-seguido/:blogId')
  async agregarBlogSeguido(@Param('id') id: string, @Param('blogId') blogId: string): Promise<void> {
    return this.usuarioService.agregarBlogSeguido(id, blogId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/remover-blog-seguido/:blogId')
  async removerBlogSeguido(@Param('id') id: string, @Param('blogId') blogId: string): Promise<void> {
    return this.usuarioService.removerBlogSeguido(id, blogId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/agregar-me-gusta/:postId')
  async agregarMeGusta(@Param('id') id: string, @Param('postId') postId: string): Promise<void> {
    return this.usuarioService.agregarMeGusta(id, postId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/remover-me-gusta/:postId')
  async removerMeGusta(@Param('id') id: string, @Param('postId') postId: string): Promise<void> {
    return this.usuarioService.removerMeGusta(id, postId);
  }
}
