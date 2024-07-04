import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type ComentarioDocument = HydratedDocument<ComentarioMongoModel>;

@Schema()
export class ComentarioMongoModel {
  @Prop({ required: true })
  contenido: string;

  @Prop({ required: true, default: Date.now })
  fechaCreacion: Date;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Post', index: true })
  postId: string;

  @Prop({ required: true, type: Types.ObjectId, ref: 'Usuario' })
  autorId: string;

  @Prop({ required: true })
  autor: string;
}

export const ComentarioSchema = SchemaFactory.createForClass(ComentarioMongoModel);
