// PartialType is a utility function that takes an existing DTO type and makes all of its properties optional.
import { PartialType } from '@nestjs/mapped-types';
import { CreateBlogDto } from "./create-blog.dto";

export class UpdateBlogDto extends PartialType(CreateBlogDto) {}