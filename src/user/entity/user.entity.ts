import { BookingEntity } from './../../booking/entity/booking.entity';
import { UserRoleTypes } from './../types/user-role.types';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;
  
    @Column()
    phone: string;
  
    @Column()
    name: string;
  
    @Column()
    surname: string;

    @Column()
    password: string;
  
    @Column({
      type: 'enum',
      enum: UserRoleTypes,
      default: UserRoleTypes.USER,
    })
    role: string;
  
    @Column({
      type: 'boolean',
      default: false,
    })
    isBlocked: boolean;
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdDateTime: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;
    
    @OneToMany(() => BookingEntity, (booking) => booking.user)
    booking: UserEntity[];
  }