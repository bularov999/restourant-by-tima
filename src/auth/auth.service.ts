import { AuthDto } from './dto/authDto.dto';
import { EXPIRES_IN_TIME, SPAM_TIME } from './constants/constants';
import { AuthEntity } from './entity/auth.entity';
import { VerifyMessageDto } from './dto/verifyMessageDto.dto';
import { ResponseMessageDto } from './dto/responseMessageDto.dto';
import { ApiError } from './../lib/errors/api.error';
import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entity/user.entity';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ResponseAccessTokenDto } from './dto/responseAccessTokenDto.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly userService: UserService,
        @InjectRepository(AuthEntity) private readonly authRepository: Repository<AuthEntity>
    ) { }


    async authorization(authDto: AuthDto): Promise<ResponseMessageDto> {
        const candidate = await this.userService.findOne({ where: { phone: authDto.phone } })
        if (candidate) {
            const candidateCreatedDateTimeInMiliseconds = candidate.createdDateTime.getTime()
            if (candidateCreatedDateTimeInMiliseconds + SPAM_TIME > Date.now()) {
                throw ApiError.badRequest('you can not sign in before 5 minutes have not passed')
            }
            try {
                const newAuth: AuthEntity = await this.createAuthEntity(candidate.phone, candidate)
                return {
                    userId: candidate.id,
                    code: newAuth.code
                }
            } catch (e) {
                throw ApiError.badRequest(e)
            }

        } else {
            try {
                const newUser: UserEntity = await this.userService.createUser(authDto)
                const newAuth: AuthEntity = await this.createAuthEntity(newUser.phone, newUser)
                return {
                    userId: newUser.id,
                    code: newAuth.code
                }
            } catch (e) {
                throw ApiError.badRequest(e)
            }
        }

    }

    async verifyMessage(verifyMessageDto: VerifyMessageDto): Promise<ResponseAccessTokenDto> {
        const authData = await this.authRepository.findOne({
            where: {
                user: {
                    id: verifyMessageDto.userId,
                },
                code: verifyMessageDto.code
            },
            relations: ['user']
        })

        if (Date.now() > authData.expiresIn.getTime()) {
            throw ApiError.forbidden('verify message error')
        }
        if (authData.code !== verifyMessageDto.code) {
            throw ApiError.notFound('verify code are not the same')
        }
        const user = await this.userService.findOne({ where: { id: verifyMessageDto.userId } })
        const payload = { username: user.email, sub: user.id }
        return {
            access_token: this.jwtService.sign(payload)
        }
    }


    async createAuthEntity(phone: string, user: UserEntity) {
        const newAuthInstance = this.authRepository.create({
            phoneNumber: phone,
            code: this.getRandom(4),
            expiresIn: this.calculateExpireInDate(Date.now()),
            user: user
        })
        return await this.authRepository.save(newAuthInstance)
    }
    getRandom(length: number): number {
        return Math.floor(Math.pow(10, length - 1) + Math.random() * 9 * Math.pow(10, length - 1));
    }
    calculateExpireInDate(date: number): Date {
        return new Date(date + EXPIRES_IN_TIME)
    }
}

