export class CreateBlogDto {
    titulo: string;
    descripcion: string;
    autor: string;
    usuarioId: string;
    posts?: string[]; // Optional field
    categoria: string;
  }
