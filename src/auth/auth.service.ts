import { VerifyMessageDto } from './dto/verifyMessageDto.dto';
import { ResponseMessageDto } from './dto/responseMessageDto.dto';
import { v4 } from 'uuid';
import { ApiError } from './../lib/errors/api.error';
import { RegistrationDto } from './dto/regisration.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entity/user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ResponseAccessTokenDto } from './dto/responseAccessTokenDto.dto';
import { type } from 'os';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }
    message: string
    async validateUser(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.userService.findOne({where: {email}})
        if (user && user.password == password) {
            delete user.password
            return user
        }
        return null
    }

    async login(loginDto: LoginDto): Promise<ResponseMessageDto> {
        const candidate = await this.validateUser(loginDto.email, loginDto.password)
        if (!candidate) {
            throw ApiError.notFound('user not found')
        }
        this.message = v4()
        return {
            userId: candidate.id,
            message: this.message 
        }
    }

    async registration(registratinDto: RegistrationDto): Promise<ResponseMessageDto> {
        const candidate = await this.validateUser(registratinDto.email, registratinDto.password)
        if (candidate) throw ApiError.badRequest('this email is already taken')
        this.message  = v4()

        try {
            const newUser: UserEntity = await this.userService.createUser(registratinDto)
            return {
                userId: newUser.id,
                message: this.message
            }
        } catch (e) {
            throw ApiError.internal('something gone wrong')
        }
    }

    async verifyMessage(verifyMessageDto: VerifyMessageDto) {
        if(!(this.message == verifyMessageDto.message)) {
            throw ApiError.badRequest('verify doesnt correct')
        } 
        const user = await this.userService.findOne({where: {id: verifyMessageDto.userId}})
            const payload = {username: user.email, sub: user.id}
            return {
                accesss_token: this.jwtService.sign(payload)
            }
    }
}

