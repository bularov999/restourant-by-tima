import { RegistrationDto } from 'src/auth/dto/regisration.dto';
import { ResponseAccessTokenDto } from './dto/responseAccessTokenDto.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiBody({type: LoginDto})
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseAccessTokenDto> {
        return await this.authService.login(loginDto)
    }
    @ApiBody({type: RegistrationDto})
    @Post('registration')
    async registration(@Body() registrationDto: RegistrationDto): Promise<ResponseAccessTokenDto> {
        return await this.authService.registration(registrationDto)
    }
}