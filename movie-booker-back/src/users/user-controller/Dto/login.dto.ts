import { IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {

  @ApiProperty({ example: 'identifiant@example.com', description: "L'email de l'utilisateur" })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'XDrw560-Awec', description: 'Mot de passe' })
  @IsString()
  password: string;
}
