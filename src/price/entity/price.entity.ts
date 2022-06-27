import { OrderEntity } from './../../order/entity/order.entity';
import { MenuEntity } from './../../menu/entity/menu.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class PriceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    size: number;

    @Column()
    price: number;

    @ManyToOne(() => MenuEntity, (menu) => menu.price)
    menu: MenuEntity

    @OneToMany(() => OrderEntity, (order) => order.price)
    order: OrderEntity[]

    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;
  
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;
}