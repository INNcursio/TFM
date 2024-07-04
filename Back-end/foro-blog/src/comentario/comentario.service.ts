import { Injectable, Inject, ConsoleLogger } from '@nestjs/common';
import { Comentario } from './domain/comentario.domain';
import { CreateComentarioDto } from './dtos/create-comentario-dto';
import { UpdateComentarioDto } from './dtos/update-comentario-dto';
import { IComentarioRepository } from './interfaces/comentario.repository.interface';
import { IComentarioService } from './interfaces/comentario.service.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ComentarioService implements IComentarioService {
  constructor(
    @Inject('IComentarioRepository') private readonly comentarioRepository: IComentarioRepository,
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const comentario = await this.comentarioRepository.create(createComentarioDto);
    console.log('comentario-created', comentario)
    this.client.emit('comentario_created', comentario);
    return comentario;
  }

  async findAll(): Promise<Comentario[]> {
    return this.comentarioRepository.findAll();
  }

  async findById(id: string): Promise<Comentario> {
    return this.comentarioRepository.findById(id);
  }

  async findByPostId(postId: string): Promise<Comentario[]> {
    return this.comentarioRepository.findByPostId(postId);
  }

  async findByAuthorId(authorId: string): Promise<Comentario[]> {
    return this.comentarioRepository.findByAuthorId(authorId);
  }

  async update(id: string, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const comentario = await this.comentarioRepository.update(id, updateComentarioDto);
    console.log('comentario-updated', comentario)
    this.client.emit('comentario_updated', comentario);
    return comentario;
  }

  async delete(id: string): Promise<void> {
    const comentario = await this.comentarioRepository.delete(id);
    this.client.emit('comentario_deleted', {"id": id});
    return comentario;
  }
}
