export class Comentario {
    constructor(
      public id: string,
      public contenido: string,
      public fechaCreacion: Date,
      public postId: string,
      public autorId: string,
      public autor: string,
    ) {}
  }
  