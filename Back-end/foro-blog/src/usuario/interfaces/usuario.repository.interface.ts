import { UsuarioMongoModel } from '../schema/usuario.schema';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { Usuario } from '../domain/usuario.domain';

export abstract class  IUsuarioRepository {
  abstract create(createUsuarioDto: CreateUserDto): Promise<Usuario>;
  abstract findAll(): Promise<Usuario[]>;
  abstract findById(id: string): Promise<UsuarioMongoModel>;
  abstract findByEmail(email: string): Promise<UsuarioMongoModel>;
  abstract update(id: string, updateUsuarioDto: Partial<UpdateUserDto>): Promise<UsuarioMongoModel>;
  abstract delete(id: string): Promise<void>;
  abstract addBlogSeguido(id: string, blogId: string): Promise<void>;
  abstract removeBlogSeguido(id: string, blogId: string): Promise<void>;
  abstract addMeGusta(id: string, postId: string): Promise<void>;
  abstract removeMeGusta(id: string, postId: string): Promise<void>;
}
