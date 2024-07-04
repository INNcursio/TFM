import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, HydratedDocument } from "mongoose";
import { Blog } from "../domain/blog.domain";
import { BlogMongoModel, BlogDocument } from "../schema/blog.schema";
import { IBlogRepository } from "../interfaces/blog.repository.interface";
import { CreateBlogDto } from "../dtos/create-blog-dto";
import { UpdateBlogDto } from "../dtos/update-blog-dto";

@Injectable()
export class BlogRepository implements IBlogRepository {
  constructor(
    @InjectModel(BlogMongoModel.name) private readonly blogModel: Model<BlogDocument>,
  ) {}

  async create(createBlogDto: CreateBlogDto): Promise<Blog> {
    const createdBlog = new this.blogModel(createBlogDto);
    const savedBlog = await createdBlog.save();
    return this.toDomain(savedBlog);
  }

  async findAll(): Promise<Blog[]> {
    const blogs = await this.blogModel.find({});
    return blogs.map(this.toDomain);
  }

  async findById(id: string): Promise<Blog> {
    const blog = await this.blogModel.findById(id);
    return this.toDomain(blog);
  }

  async update(id: string, updateBlogDto: UpdateBlogDto): Promise<Blog> {
    const updatedBlog = await this.blogModel.findByIdAndUpdate(id, updateBlogDto, { new: true });
    return this.toDomain(updatedBlog);
  }

  async delete(id: string): Promise<void> {
    await this.blogModel.findByIdAndDelete(id).exec();
  }

  async findByUserId(id: string): Promise<Blog[]> {
    const blogs = await this.blogModel.find({ usuarioId: id });
    return blogs.map(this.toDomain);
  }

  private toDomain(blog: HydratedDocument<BlogMongoModel>): Blog {
    if (blog) {
      const newBlog = new Blog(
        blog._id.toString(),
        blog.titulo,
        blog.descripcion,
        blog.autor,
        blog.usuarioId.toString(),
        blog.posts.map(postId => postId.toString()),
        blog.createdAt,
        blog.categoria,
      );
      return newBlog;
    }
    return null;
  }
}
