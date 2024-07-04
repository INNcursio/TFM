export class Usuario {
	id?: string;
	nombre: string;
	email: string;
	password: string;
	bio: string;
	blogsSeguidos?: string[];
	meGusta?: string[];
  
	constructor(id: string, nombre: string, email: string, password: string, blogsSeguidos?: string[], meGusta?: string[], bio?: string) {
	  this.id = id;
	  this.nombre = nombre;
	  this.email = email;
	  this.password = password;
	  this.blogsSeguidos = blogsSeguidos;
	  this.meGusta = meGusta;
	  this.bio = bio;
	}
  }
  