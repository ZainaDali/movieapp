import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../../users/entities/user.entity';
export declare class ReservationService {
    private readonly repo_reservation;
    private readonly repo_user;
    constructor(repo_reservation: Repository<Reservation>, repo_user: Repository<User>);
    reserver_film(id_user: number, id_movie: number, debut: Date): Promise<Reservation>;
    get_reservation(userId: number): Promise<Reservation[]>;
    annuler_reservation(reservationId: number): Promise<{
        message: string;
    }>;
}
