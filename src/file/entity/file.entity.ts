import { MenuEntity } from './../../menu/entity/menu.entity';
import { AfterLoad, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
@Entity()
export class FileEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string
  
    @Column()
    size: number;
  
    @Column()
    contentType: string;
    
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createDateTime: Date;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;
    
    @ManyToOne(() => MenuEntity , (menu) => menu.pictures)
    menu: MenuEntity;
  
    url: string;
  
    @AfterLoad()
    genUrl() {
      this.url = this.id;
    }
}