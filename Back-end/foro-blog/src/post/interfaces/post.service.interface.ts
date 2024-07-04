import { Post } from '../domain/post.domain';
import { CreatePostDto } from '../dtos/create-post-dto';
import { UpdatePostDto } from '../dtos/update-post-dto';


export abstract class IPostService {
  abstract create(createPostDto: CreatePostDto): Promise<Post>;
  abstract findAll(): Promise<Post[]>;
  abstract findById(id: string): Promise<Post>;
  abstract findByBlogId(blogId: string): Promise<Post[]>;
  abstract findByAuthorId(authorId: string): Promise<Post[]>;
  abstract update(id: string, updatePostDto: UpdatePostDto): Promise<Post>;
  abstract deletePost(id: string): Promise<void>;
  abstract borrarTodosLosPostAlBlog(blogId: string): Promise<void>;
}
