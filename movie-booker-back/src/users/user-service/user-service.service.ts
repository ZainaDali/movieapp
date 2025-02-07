import { Injectable } from '@nestjs/common';
import { ConflictException } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from '../user-controller/Dto/register.dto';
import * as bcrypt from 'bcrypt';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../user-controller/Dto/login.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const { email, password } = registerDto;

    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException("Cet utilisateur existe déja");
    }

    const hashpass = await bcrypt.hash(password, 10);
    const nvUser = this.userRepository.create({email,password: hashpass});

    const { password: _, ...usersansPassword } = await this.userRepository.save(nvUser);
    return usersansPassword;
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Email ou mot de passe non valide');
    }
    const PassValide = await bcrypt.compare(password, user.password);

    if (!PassValide) {
      throw new UnauthorizedException('Email ou mot de non valide.');
    }
    const payload = { id: user.id, email: user.email };
    const token = this.jwtService.sign(payload);
    return { token };
  }
  async getUserWithReservations(userId: number) {
    return await this.userRepository.findOne({
        where: { id: userId },
        relations: ['reservations'], 
    });
}

}
