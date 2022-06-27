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

    async validateUser(email: string, password: string): Promise<UserEntity | null> {
        const user = await this.userService.findOne({where: {email}})
        if (user && user.password == password) {
            delete user.password
            return user
        }
        return null
    }

    async login(loginDto: LoginDto): Promise<ResponseAccessTokenDto> {
        const candidate = await this.validateUser(loginDto.email, loginDto.password)
        if (!candidate) {
            throw ApiError.notFound('user not found')
        }
        const payload = { username: candidate.email, sub: candidate.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }

    async registration(registratinDto: RegistrationDto): Promise<ResponseAccessTokenDto> {
        const candidate = await this.validateUser(registratinDto.email, registratinDto.password)
        if (candidate) throw ApiError.badRequest('this email is already taken')
        try {
            const newUser: UserEntity = await this.userService.createUser(registratinDto)
            const payload = { username: newUser.email, sub: newUser.id }
            return {
                access_token: this.jwtService.sign(payload)
            }
        } catch (e) {
            throw ApiError.internal('something gone wrong')
        }
    }
}

