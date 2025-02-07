import { ReservationService } from '../reservation-service/reservation.service';
export declare class ReservationController {
    private readonly reservationService;
    constructor(reservationService: ReservationService);
    reserver_film(req: any, id_movie: number, debut: string): Promise<{
        message: string;
        data: import("../entities/reservation.entity").Reservation;
    }>;
    get_reservation(req: any): Promise<import("../entities/reservation.entity").Reservation[]>;
    annuler_reservation(id_reservation: number): Promise<{
        message: string;
    }>;
}
