import { RegisterDto } from './Dto/register.dto';
import { LoginDto } from './Dto/login.dto';
import { UserService } from '../user-service/user-service.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
        data: Omit<import("../entities/user.entity").User, "password">;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        message: string;
    }>;
    getProfile(req: any): Promise<{
        message: string;
        user: {
            id: number;
            email: string;
            reservations: {
                id: number;
                id_movie: number;
                debut: Date;
                fin: Date;
            }[];
        };
    } | undefined>;
}
