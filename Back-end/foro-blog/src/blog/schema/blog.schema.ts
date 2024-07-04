import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
export type BlogDocument = HydratedDocument<BlogMongoModel>;

@Schema({ timestamps: true }) // Esto añadirá automáticamente createdAt y updatedAt
export class BlogMongoModel {
  @Prop({ required: true })
  titulo: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  autor: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Usuario' })
  usuarioId: string;

  @Prop({ type: [Types.ObjectId], ref: 'Post' })
  posts: string[];

  @Prop({ type: Date, default: Date.now })
  createdAt?: Date; // Esto es opcional ya que el timestamp lo manejará Mongoose automáticamente

  @Prop({ required: true })
  categoria: string;
}

export const BlogSchema = SchemaFactory.createForClass(BlogMongoModel);
