import { UserRoleTypes } from './types/user-role.types';
import { hashPasswordByBcrypt } from './../lib/bcrypt/bcrypt';
import { ApiError } from './../lib/errors/api.error';
import { ModeratorDto } from './dto/moderatorDto.dto';
import { AuthDto } from './../auth/dto/authDto.dto';
import { UserEntity } from './entity/user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {
    }
    async findOne(data: any): Promise<UserEntity> {
        return await this.userRepository.findOne(data)
    }
    async createUser(authDto: AuthDto): Promise<UserEntity> {
        const newUser = this.userRepository.create(authDto)
        return await this.userRepository.save(newUser)
    }
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userRepository.find()
    }
    async createModerator(moderatorDto: ModeratorDto): Promise<UserEntity> {
        const candidate: UserEntity = await this.userRepository.findOne({ where: {email: moderatorDto.email} })
        if (candidate) throw ApiError.badRequest('this user is already taken')
        const hashPassword = hashPasswordByBcrypt(moderatorDto.password)
        moderatorDto.password = hashPassword
        moderatorDto.role = UserRoleTypes.MODERATOR
        const moderatorInstance = this.userRepository.create(moderatorDto)
        return await this.userRepository.save(moderatorInstance)
    }

}