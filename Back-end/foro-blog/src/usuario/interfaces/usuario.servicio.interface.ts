import { Usuario } from '../domain/usuario.domain';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { UsuarioMongoModel } from '../schema/usuario.schema';

export abstract class  IUsuarioService {
  abstract crearUsuario(createUserDto: CreateUserDto): Promise<Usuario>;
  abstract encontrarTodosUsuarios(): Promise<Usuario[]>;
  abstract encontrarPorId(id: string): Promise<UsuarioMongoModel>;
  abstract encontarPorEmail(email: string): Promise<UsuarioMongoModel>;
  abstract actualizarUsuario(id: string, updateUserDto: UpdateUserDto): Promise<UsuarioMongoModel>;
  abstract borrarUsuario(id: string): Promise<void>;
  abstract agregarBlogSeguido(id: string, blogId: string): Promise<void>;
  abstract removerBlogSeguido(id: string, blogId: string): Promise<void>;
  abstract agregarMeGusta(id: string, postId: string): Promise<void>;
  abstract removerMeGusta(id: string, postId: string): Promise<void>;
}
