import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly nombre: string;

  @MinLength(6)
  readonly password: string;
  
  @IsEmail()
  readonly email: string;

  @IsOptional()
  readonly rol: string; // bloguero, lector, moderador
}
