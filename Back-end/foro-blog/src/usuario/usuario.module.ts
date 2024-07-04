import { Module } from '@nestjs/common';
import { UsuarioController } from './usuario.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsuarioMongoModel, UsuarioSchema } from './schema/usuario.schema';
import { UsuarioService } from './usuario.service';
import { UsuarioRepository } from './repository/usuario.repository';
import { IUsuarioRepository } from './interfaces/usuario.repository.interface';
import { Usuario } from './domain/usuario.domain';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: UsuarioMongoModel.name,
        schema: UsuarioSchema,
      },
    ]),
  ],
  controllers: [UsuarioController],
  providers: [
    UsuarioService,
    {
      provide: 'IUsuarioService',
      useClass: UsuarioService,
    },
    {
      provide: 'IUsuarioRepository',
      useClass: UsuarioRepository,
    },
  ],
  exports: [UsuarioService],
})
export class UsuarioModule {}
