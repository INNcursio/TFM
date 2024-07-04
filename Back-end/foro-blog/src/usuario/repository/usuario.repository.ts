import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user-dto';
import { UpdateUserDto } from '../dtos/update-user-dto';
import { IUsuarioRepository } from '../interfaces/usuario.repository.interface';
import { UsuarioMongoModel } from '../schema/usuario.schema';
import { Usuario } from '../domain/usuario.domain';

@Injectable()
export class UsuarioRepository implements IUsuarioRepository {
    constructor(
        @InjectModel(UsuarioMongoModel.name) private readonly usuarioModel: Model<UsuarioMongoModel>) { }


    
    // metodo que convierta a clase del dominio:
    private toDomain(usuario: HydratedDocument<UsuarioMongoModel>): Usuario {
        if (usuario) {
          const newUser = new Usuario(
            usuario._id.toString(),
            usuario.nombre,
            usuario.email,
            usuario.password,
            usuario.blogsSeguidos,
            usuario.meGusta,
            usuario.bio
          );
          return newUser;
        }
        return null;
      }
    async create(createUsuarioDto: CreateUserDto): Promise<Usuario> {
        const usuarioMongo = await this.usuarioModel.create(createUsuarioDto);
        return this.toDomain(usuarioMongo);
    }

    async findAll(): Promise<Usuario[]> {
        // debe de usar el toDomain para 
        const usuariosMongo = await this.usuarioModel.find({});
        return usuariosMongo.map((usuario) => this.toDomain(usuario));
    }

    async findById(id: string): Promise<UsuarioMongoModel> {
        // Implement the logic to find a user by ID
        const usuarioMongo = await this.usuarioModel.findById(id);
        return this.toDomain(usuarioMongo);
    }

    async findByEmail(email: string): Promise<UsuarioMongoModel> {
        const usuarioMongo = await this.usuarioModel.findOne({ email });
        return this.toDomain(usuarioMongo);
    }

    async update(id: string, updateUsuarioDto: UpdateUserDto): Promise<UsuarioMongoModel> {
        // Implement the logic to update a user
        return this.usuarioModel.findByIdAndUpdate(id, updateUsuarioDto, { new: true })
    }

    async delete(id: string): Promise<void> {
        // Implement the logic to delete a user
        await this.usuarioModel.findByIdAndDelete(id);
    }

    async addBlogSeguido(id: string, blogId: string): Promise<void> {
        // Implement the logic to add a blog followed by a user
        await this.usuarioModel.findByIdAndUpdate(id, { $push: { blogsSeguidos: blogId } });
    }

    async removeBlogSeguido(id: string, blogId: string): Promise<void> {
        // Implement the logic to remove a blog followed by a user
        await this.usuarioModel.findByIdAndUpdate(id, { $pull: { blogsSeguidos: blogId } });
    }

    async addMeGusta(id: string, postId: string): Promise<void> {
        // Implement the logic to add a like to a post
        await this.usuarioModel.findByIdAndUpdate(id, { $push: { meGusta: postId } });
    }

    async removeMeGusta(id: string, postId: string): Promise<void> {
        // Implement the logic to remove a like from a post
        await this.usuarioModel.findByIdAndUpdate(id, { $pull: { meGusta: postId } });
    }

}
