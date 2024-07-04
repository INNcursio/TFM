import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, HydratedDocument } from 'mongoose';

import { Post } from '../domain/post.domain';
import { CreatePostDto } from '../dtos/create-post-dto';
import { UpdatePostDto } from '../dtos/update-post-dto';
import { IPostRepository } from '../interfaces/post.repository.interface';
import { PostMongoModel, PostDocument } from '../schemas/post.schema';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectModel(PostMongoModel.name) private readonly postModel: Model<PostDocument>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    const savedPost = await createdPost.save();
    return this.toDomain(savedPost);
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find({});
    return posts.map(this.toDomain);
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id);
    return this.toDomain(post);
  }

  async findByBlogId(blogId: string): Promise<Post[]> {
    const posts = await this.postModel.find({ blogId });
    return posts.map(this.toDomain);
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    const posts = await this.postModel.find({ autorId: authorId });
    return posts.map(this.toDomain);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
    return this.toDomain(updatedPost);
  }

  async delete(id: string): Promise<void> {
    await this.postModel.findByIdAndDelete(id);
  }

  async deleteMany(query: any): Promise<void> {
    await this.postModel.deleteMany(query);
  }

  private toDomain(post: HydratedDocument<PostMongoModel>): Post {
    if (post) {
      const newPost = new Post(
        post._id.toString(),
        post.contenido,
        post.fechaCreacion,
        post.blogId.toString(),
        post.blogTitulo,
        post.autorId.toString(),
        post.autor,
      );
      return newPost;
    }
    return null;
  }
}
