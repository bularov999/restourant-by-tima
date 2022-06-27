import { UserService } from './../user/user.service';
import { UserEntity } from './../user/entity/user.entity';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/constants';

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '10m' }
        })
    ],
    providers: [AuthService],
    controllers: [AuthController],

})
export class AuthModule {

}