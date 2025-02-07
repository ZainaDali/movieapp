import { Controller } from '@nestjs/common';
import { Post, Get, Body } from '@nestjs/common';
import { UseGuards, Req } from '@nestjs/common';
import { RegisterDto } from './Dto/register.dto';
import { LoginDto } from './Dto/login.dto';
import { UserService } from '../user-service/user-service.service';
import { JwtAuthGuard } from '../../users/jwt-auth.guard';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentification')
@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @ApiOperation({ summary: "Création d'un compte utilisateur" })
  async register(@Body() registerDto: RegisterDto) {
    const user = await this.userService.register(registerDto);
    return { message: 'Inscription valide', data: user };
  }

  @Post('login')
  @ApiOperation({ summary: 'Connexion' })
  async login(@Body() loginDto: LoginDto) {
    const token = await this.userService.login(loginDto);
    return { message: 'Connexion valide', ...token };
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: "Profile utilisateur connecté" })
  async getProfile(@Req() req) {
    const userId = req.user.id;
    
    const user = await this.userService.getUserWithReservations(userId);
    if (user){
    return { 
        message: "Profil et réservations récupérés avec succès", 
        user: {
            id: user.id,
            email: user.email,
            reservations: user.reservations.map(reservation => ({
                id: reservation.id,
                id_movie: reservation.id_movie,
                debut: reservation.debut,
                fin: reservation.fin,
            })),
        } 
    };}
}
}

