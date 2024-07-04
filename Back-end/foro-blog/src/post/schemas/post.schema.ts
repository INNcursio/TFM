import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<PostMongoModel>;

@Schema()
export class PostMongoModel {

  @Prop({ required: true })
  contenido: string;

  @Prop({ required: true, default: Date.now })
  fechaCreacion: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Blog', index: true })
  blogId: string;

  @Prop({ required: true })
  blogTitulo: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Usuario' })
  autorId: string;

  @Prop({ required: true })
  autor: string;
}

export const PostSchema = SchemaFactory.createForClass(PostMongoModel);
