import { UserEntity } from './../../user/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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
    @ManyToOne(() => UserEntity, user => user.auth)
    user: UserEntity
}