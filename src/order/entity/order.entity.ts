import { BookingEntity } from './../../booking/entity/booking.entity';
import { UserEntity } from './../../user/entity/user.entity';
import { PriceEntity } from './../../price/entity/price.entity';
import { MenuEntity } from './../../menu/entity/menu.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    count: number

    @ManyToOne(() => MenuEntity, (menu) => menu.order)
    menu: MenuEntity;

    @ManyToOne(() => PriceEntity, (price) => price.order)
    price: PriceEntity
    
    @ManyToOne(() => BookingEntity, (booking) => booking.order)
    booking: BookingEntity

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;
    
}