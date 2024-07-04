import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';

import { IComentarioRepository } from '../interfaces/comentario.repository.interface';
import { ComentarioMongoModel, ComentarioDocument } from '../schema/comentario.schema';
import { Comentario } from '../domain/comentario.domain';
import { CreateComentarioDto } from '../dtos/create-comentario-dto';
import { UpdateComentarioDto } from '../dtos/update-comentario-dto';

@Injectable()
export class ComentarioRepository implements IComentarioRepository {
  constructor(
    @InjectModel(ComentarioMongoModel.name) private readonly comentarioModel: Model<ComentarioDocument>,
  ) {}

  async create(createComentarioDto: CreateComentarioDto): Promise<Comentario> {
    const createdComentario = new this.comentarioModel(createComentarioDto);
    const savedComentario = await createdComentario.save();
    return this.toDomain(savedComentario);
  }

  async findAll(): Promise<Comentario[]> {
    const comentarios = await this.comentarioModel.find({});
    return comentarios.map(this.toDomain);
  }

  async findById(id: string): Promise<Comentario> {
    const comentario = await this.comentarioModel.findById(id);
    return this.toDomain(comentario);
  }

  async findByPostId(postId: string): Promise<Comentario[]> {
    const comentarios = await this.comentarioModel.find({ postId });
    return comentarios.map(this.toDomain);
  }

  async findByAuthorId(authorId: string): Promise<Comentario[]> {
    const comentarios = await this.comentarioModel.find({ autorId: authorId });
    return comentarios.map(this.toDomain);
  }

  async update(id: string, updateComentarioDto: UpdateComentarioDto): Promise<Comentario> {
    const updatedComentario = await this.comentarioModel.findByIdAndUpdate(id, updateComentarioDto, { new: true });
    return this.toDomain(updatedComentario);
  }

  async delete(id: string): Promise<void> {
    await this.comentarioModel.findByIdAndDelete(id);
  }

  async deleteMany(query: any): Promise<void> {
    await this.comentarioModel.deleteMany(query);
  }

  private toDomain(comentario: HydratedDocument<ComentarioMongoModel>): Comentario {
    if (comentario) {
      const newComentario = new Comentario(
        comentario._id.toString(),
        comentario.contenido,
        comentario.fechaCreacion,
        comentario.postId.toString(),
        comentario.autorId.toString(),
        comentario.autor,
      );
      return newComentario;
    }
    return null;
  }
}
