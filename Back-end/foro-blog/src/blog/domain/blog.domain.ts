export class Blog {
    id?: string;
    titulo: string;
    autor: string;
    descripcion: string;
    usuarioId: string;
    posts: string[];
    fecha: Date;
    categoria: string;

    constructor( id : string, titulo: string, descripcion : string, autor: string, usuarioId: string, posts: string[], fecha: Date ,categoria: string) {
      this.id = id;
      this.titulo = titulo;
      this.descripcion = descripcion;
      this.autor = autor;
      this.usuarioId = usuarioId;
      this.posts = posts;
      this.fecha = fecha;
      this.categoria = categoria;
    }
  }