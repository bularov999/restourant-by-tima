
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
        return  await this.userRepository.findOne(data)
    }
    async createUser(registrationDto: RegistrationDto): Promise<UserEntity> {
        const newUser =  this.userRepository.create(registrationDto)
        return await this.userRepository.save(newUser)
    }
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }
}