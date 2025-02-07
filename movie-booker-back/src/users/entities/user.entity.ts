import { Entity, PrimaryGeneratedColumn, Column, OneToMany  } from 'typeorm';
import { Reservation } from '../../reservation/entities/reservation.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservations: Reservation[];
}
