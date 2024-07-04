export class Post {
    constructor(
      public id: string,
      public contenido: string,
      public fechaCreacion: Date,
      public blogId: string,
      public blogTitulo: string,
      public autorId: string,
      public autor: string,
    ) {}
  }
  