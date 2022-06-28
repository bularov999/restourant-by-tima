import { AuthDto } from './dto/authDto.dto';
import { VerifyMessageDto } from './dto/verifyMessageDto.dto';
import { ResponseMessageDto } from './dto/responseMessageDto.dto';
import { ResponseAccessTokenDto } from './dto/responseAccessTokenDto.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }
    @ApiTags('auth')
    @ApiOperation({ summary: 'authorization with email, phone, name' })
    @ApiBody({ type: AuthDto })
    @Post('authorization')
    async authorization(@Body() authDto: AuthDto): Promise<ResponseMessageDto> {
        return await this.authService.authorization(authDto)
    }

    @ApiTags('auth')
    @ApiOperation({ summary: 'verify message code' })
    @ApiBody({ type: VerifyMessageDto })
    @Post('verify-message')
    async verifyMessage(@Body() verifyMessageDto: VerifyMessageDto): Promise<ResponseAccessTokenDto> {
        return await this.authService.verifyMessage(verifyMessageDto)
    }


}