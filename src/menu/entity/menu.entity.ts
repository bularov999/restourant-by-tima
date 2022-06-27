import { OrderEntity } from './../../order/entity/order.entity';
import { PriceEntity } from './../../price/entity/price.entity';
import { FileEntity } from './../../file/entity/file.entity';
import { MainMenuTypes } from './../types/mainMenuTypes.type';
import { MenuTypes } from './../types/menyTypes.type';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class MenuEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    type: 'enum',
    enum: MenuTypes,
    default: MenuTypes.MAIN,
  })
  type: string;

  @Column({
    type: 'enum',
    enum: MainMenuTypes,
    default: MainMenuTypes.MAIN_DISHES
  })
  mainMenuType: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createDateTime: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  lastUpdateDateTime: Date;

  @OneToMany(() => FileEntity, (file) => file.menu)
  pictures: FileEntity[];

  @OneToMany(() => PriceEntity, (price) => price.menu)
  price: PriceEntity[];

  @OneToMany(() => OrderEntity, (order) => order.menu)
  order: OrderEntity[]
}