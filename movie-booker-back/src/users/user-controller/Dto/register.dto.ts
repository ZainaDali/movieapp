import { IsEmail, IsString, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'identifiant@example.com', description: 'Adresse email' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'XDrw560-Awec', description: 'Mot de passe', minLength: 8, maxLength: 22 })
  @IsString()
  @MinLength(8)
  @MaxLength(22)
  password: string;
}
