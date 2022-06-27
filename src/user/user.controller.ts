import { RolesGuard } from './../auth/guards/roles.guard';
import { UserRoleTypes } from './types/user-role.types';
import { Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/guards/authGuard.guard";
import { Roles } from "src/common/decorators/roles.decorator";
import { UserEntity } from "./entity/user.entity";
import { UserService } from "./user.service";
import { ApiParam } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Get('find/:id')
    @ApiParam({name: 'id' })
    async findUserById(id: string): Promise<UserEntity> {
        return await this.userService.findOne({where: {id}})
    }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Get('find-all')
    async findAllUsers(): Promise<UserEntity[]> {
        return await this.userService.findAllUsers()
    }

    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Get('user')
    user() {
        return 'user'
    }
}