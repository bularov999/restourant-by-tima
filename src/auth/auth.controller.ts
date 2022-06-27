import { VerifyMessageDto } from './dto/verifyMessageDto.dto';
import { ResponseMessageDto } from './dto/responseMessageDto.dto';
import { RegistrationDto } from 'src/auth/dto/regisration.dto';
import { ResponseAccessTokenDto } from './dto/responseAccessTokenDto.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiOperation({summary: 'login to server'})
    @ApiTags('auth')
    @ApiBody({type: LoginDto})
    @Post('login')
    async login(@Body() loginDto: LoginDto): Promise<ResponseMessageDto> {
        return await this.authService.login(loginDto)
    }
    
    @ApiTags('auth')
    @ApiOperation({summary: 'registration to server'})
    @ApiBody({type: RegistrationDto})
    @Post('registration')
    async registration(@Body() registrationDto: RegistrationDto): Promise<ResponseMessageDto> {
        return await this.authService.registration(registrationDto)
    }

    @ApiTags('auth')
    @ApiOperation({summary: 'verify message code'})
    @ApiBody({type: VerifyMessageDto})
    @Post('verify-message')
    async verifyMessage(@Body() verifyMessageDto: VerifyMessageDto) {
        return await this.authService.verifyMessage(verifyMessageDto)
    }


}