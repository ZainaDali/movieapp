import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, LessThan, MoreThan } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private readonly repo_reservation: Repository<Reservation>,
    
    @InjectRepository(User)
    private readonly repo_user: Repository<User>
  ) {}

  async reserver_film(id_user: number, id_movie: number, debut: Date) {
    const fin = new Date(debut);
    fin.setHours(fin.getHours() + 2); 

    const verif_reservation = await this.repo_reservation.findOne({
      where: [
        { user: { id: id_user }, debut: Between(debut, fin) },
        { user: { id: id_user }, fin: Between(debut, fin) },
        { user: { id: id_user }, debut: LessThan(fin), fin: MoreThan(debut) }
      ],
    });

    if (verif_reservation) {
      throw new ConflictException('une réservation existe deja à cet horaire');
    }

    const user = await this.repo_user.findOne({ where: { id: id_user } });

    if (user) {
      const reservation = this.repo_reservation.create({
        user,
        id_movie,
        debut,
        fin,
      });
  
      return await this.repo_reservation.save(reservation);
    }else {
      throw new NotFoundException('veuillez vous connectez');
    }

    
  }
  async get_reservation(userId: number) {
    return await this.repo_reservation.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async annuler_reservation(reservationId: number) {
    const reservation = await this.repo_reservation.findOne({
      where: { id: reservationId },
    });

    if (reservation) {
      await this.repo_reservation.remove(reservation);
      return { message: 'la réservation est annulée' };
    }else{
      throw new NotFoundException("la réservation n'existe pas");
    }

    
  }
}
