import { Blog } from '../domain/blog.domain';
import { CreateBlogDto } from '../dtos/create-blog-dto';
import { UpdateBlogDto } from '../dtos/update-blog-dto';

export abstract class IBlogRepository {
  abstract create(createBlogDto: CreateBlogDto): Promise<Blog>;
  abstract findAll(): Promise<Blog[]>;
  abstract findById(id: string): Promise<Blog>;
  abstract update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog>;
  abstract delete(id: string): Promise<void>;
  abstract findByUserId(id: string): Promise<Blog[]>;
}
