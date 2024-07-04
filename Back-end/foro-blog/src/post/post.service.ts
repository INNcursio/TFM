import { Injectable, Inject } from '@nestjs/common';
import { Post } from './domain/post.domain';
import { CreatePostDto } from './dtos/create-post-dto';
import { UpdatePostDto } from './dtos/update-post-dto';
import { IPostRepository } from './interfaces/post.repository.interface';
import { IPostService } from './interfaces/post.service.interface';
import { IComentarioRepository } from '../comentario/interfaces/comentario.repository.interface';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostService implements IPostService {
  constructor(
    @Inject('IPostRepository') private readonly postRepository: IPostRepository,
    @Inject('IComentarioRepository') private readonly comentarioRepository: IComentarioRepository,
    @Inject('NATS_SERVICE') private readonly client: ClientProxy,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create(createPostDto);
    
    this.client.emit('post_created', post);
    console.log('post-created', post)
    return post;
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async findById(id: string): Promise<Post> {
    return this.postRepository.findById(id);
  }

  async findByBlogId(blogId: string): Promise<Post[]> {
    return this.postRepository.findByBlogId(blogId);
  }

  async findByAuthorId(authorId: string): Promise<Post[]> {
    return this.postRepository.findByAuthorId(authorId);
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.postRepository.update(id, updatePostDto);
    this.client.emit('post_updated', post);
    return this.postRepository.update(id, updatePostDto);
  }

  async deletePost(id: string): Promise<void> {
    await this.comentarioRepository.deleteMany({ postId: id });
    const post = await this.postRepository.delete(id);
    this.client.emit('post_deleted',{"id": id});
    return post;
  }

  async borrarTodosLosPostAlBlog(blogId: string): Promise<void> {
    const posts = await this.findByBlogId(blogId);
    for (const post of posts) {
      await this.deletePost(post.id);
    }
  }
}
