import { ModeratorDto } from './dto/moderatorDto.dto';
import { RolesGuard } from './../auth/guards/roles.guard';
import { UserRoleTypes } from './types/user-role.types';
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/authGuard.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { ApiBearerAuth, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    @ApiTags('user controller')
    @ApiOperation({ summary: 'find user by his id' })
    @ApiBearerAuth('defaultBearerAuth')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN, UserRoleTypes.MODERATOR)
    @Get('find/:id')
    @ApiParam({ name: 'id' })
    async findUserById(id: string): Promise<UserEntity> {
        return await this.userService.findOne({ where: { id } })
    }
    @ApiTags('user controller')
    @ApiOperation({ summary: 'find all users' })
    @ApiBearerAuth('defaultBearerAuth')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN, UserRoleTypes.MODERATOR)
    @Get('find-all')
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userService.findAllUsers()
    }
    @ApiTags('user controller')
    @ApiOperation({ summary: 'create moderator' })
    @ApiBearerAuth('defaultBearerAuth')
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('create-moderator')
    async createModerator(@Body() moderatorDto: ModeratorDto): Promise<UserEntity> {
        return await this.userService.createModerator(moderatorDto)
    }
}