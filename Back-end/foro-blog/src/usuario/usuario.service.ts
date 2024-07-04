import { Injectable, Inject } from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user-dto";
import { UpdateUserDto } from "./dtos/update-user-dto";
import { IUsuarioRepository } from "./interfaces/usuario.repository.interface";
import { IUsuarioService } from "./interfaces/usuario.servicio.interface";
import { UsuarioMongoModel } from "./schema/usuario.schema";
import { Usuario } from "./domain/usuario.domain";

@Injectable()
export class UsuarioService  implements  IUsuarioService{
  constructor(
    @Inject('IUsuarioRepository') private readonly usuarioRepository: IUsuarioRepository,
  ){}

  async crearUsuario(createUserDto: CreateUserDto): Promise<Usuario> {
    return this.usuarioRepository.create(createUserDto);
  }

  async encontrarTodosUsuarios(): Promise<Usuario[]> {
    return this.usuarioRepository.findAll();
  }

  async encontrarPorId(id: string): Promise<UsuarioMongoModel> {
    return this.usuarioRepository.findById(id);
  }

  async encontarPorEmail(email: string): Promise<UsuarioMongoModel> {
    return this.usuarioRepository.findByEmail(email);
  }

  async actualizarUsuario(id: string, updateUserDto: UpdateUserDto): Promise<UsuarioMongoModel> {
    return this.usuarioRepository.update(id, updateUserDto);
  }

  async borrarUsuario(id: string): Promise<void> {
    await this.usuarioRepository.delete(id);
  }

  async agregarBlogSeguido(id: string, blogId: string): Promise<void> {
    await this.usuarioRepository.addBlogSeguido(id, blogId);
  }

  async removerBlogSeguido(id: string, blogId: string): Promise<void> {
    await this.usuarioRepository.removeBlogSeguido(id, blogId);
  }

  async agregarMeGusta(id: string, postId: string): Promise<void> {
    await this.usuarioRepository.addMeGusta(id, postId);
  }

  async removerMeGusta(id: string, postId: string): Promise<void> {
    await this.usuarioRepository.removeMeGusta(id, postId);
  }

}
