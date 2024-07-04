import { Comentario } from '../domain/comentario.domain';
import { CreateComentarioDto } from '../dtos/create-comentario-dto';
import { UpdateComentarioDto } from '../dtos/update-comentario-dto';


export abstract class IComentarioRepository {
  abstract create(createComentarioDto: CreateComentarioDto): Promise<Comentario>;
  abstract findAll(): Promise<Comentario[]>;
  abstract findById(id: string): Promise<Comentario>;
  abstract findByPostId(postId: string): Promise<Comentario[]>;
  abstract findByAuthorId(authorId: string): Promise<Comentario[]>;
  abstract update(id: string, updateComentarioDto: UpdateComentarioDto): Promise<Comentario>;
  abstract delete(id: string): Promise<void>;
  abstract deleteMany(query: any): Promise<void>;
}
