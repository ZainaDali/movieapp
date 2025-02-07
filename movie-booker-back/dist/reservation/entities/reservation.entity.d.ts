import { User } from '../../users/entities/user.entity';
export declare class Reservation {
    id: number;
    user: User;
    id_movie: number;
    debut: Date;
    fin: Date;
}
