import { Repository } from 'typeorm';
import { RegisterDto } from '../user-controller/Dto/register.dto';
import { User } from '../entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../user-controller/Dto/login.dto';
export declare class UserService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(registerDto: RegisterDto): Promise<Omit<User, 'password'>>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getUserWithReservations(userId: number): Promise<User | null>;
}
