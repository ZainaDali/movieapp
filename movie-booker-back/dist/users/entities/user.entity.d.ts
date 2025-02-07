import { Reservation } from '../../reservation/entities/reservation.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    reservations: Reservation[];
}
