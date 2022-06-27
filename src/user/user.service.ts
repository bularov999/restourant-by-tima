
import { UserEntity } from './entity/user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { RegistrationDto } from 'src/auth/dto/regisration.dto';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
     }
    async findOne(data: any): Promise<UserEntity> {
        const user = await this.userRepository.findOne(data)
        return user
    }
    async createUser(registrationDto: RegistrationDto): Promise<UserEntity> {
        const newUser =  this.userRepository.create(registrationDto)
        await this.userRepository.save(newUser)
        return newUser
    }
    async findAllUsers(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.userRepository.find()
        return users
    }
}