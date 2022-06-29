import { BookingPaidStatusType } from './../types/bookingPaidStatus.types';
import { OrderEntity } from '../../order/entity/order.entity';
import { TableEntity } from '../../table/entity/table.entity';
import { BookingStatusTypes } from '../types/booking.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/user/entity/user.entity';

@Entity()
export class BookingEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seatsCount: number;

  @Column({ type: 'timestamptz' })
  dateTime: Date;

  @Column({
    type: 'enum',
    enum: BookingPaidStatusType,
    default: BookingPaidStatusType.UNPAID,
  })
  paidStatus: BookingPaidStatusType;

  @Column({
    type: 'enum',
    enum: BookingStatusTypes,
    default: BookingStatusTypes.PENDING,
  })
  status: BookingStatusTypes;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdateDateTime: Date;

  @ManyToOne(() => UserEntity, (user) => user.booking)
  user: UserEntity;

  @ManyToOne(() => TableEntity, (table) => table.booking)
  table: TableEntity;
  @OneToMany(() => OrderEntity, (order) => order.booking)
  order: OrderEntity[];
}
