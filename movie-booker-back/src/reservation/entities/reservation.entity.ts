import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';


@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.reservations)
  user: User;

  @Column()
  id_movie: number;

  @Column({ type: 'timestamp' })
  debut: Date;

  @Column({ type: 'timestamp' })
  fin: Date;

}
