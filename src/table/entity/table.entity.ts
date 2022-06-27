import { TableStatusTypes } from './../types/tableStatus.type';
import { BookingEntity } from './../../booking/entity/booking.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class TableEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    group: string;

    @Column()
    index: number;

    @Column()
    seatsCount: number;

    @Column({
        type: 'enum',
        enum: TableStatusTypes,
        default: TableStatusTypes.AVAILABLE,
    })
    status: TableStatusTypes;

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;

    @OneToMany(() => BookingEntity, (booking) => booking.table)
    booking: BookingEntity[];
}