import { Optional } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UsuarioDocument = HydratedDocument<UsuarioMongoModel>;

@Schema()
export class UsuarioMongoModel {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  email: string;

  @Prop({ type: [String], default: [] }) 
  blogsSeguidos?: string[];

  @Prop({ type: [String], default: [] }) 
  meGusta?: string[];

  @Prop({ required: false, default: ''})
  bio: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(UsuarioMongoModel);
