import { UserEntity } from './../../user/entity/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    phoneNumber: string;
    @Column()
    code: number
    @Column()
    expiresIn: Date
    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdDateTime: Date;
    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateDateTime: Date;
    @ManyToOne(() => UserEntity, user => user.auth)
    user: UserEntity
}