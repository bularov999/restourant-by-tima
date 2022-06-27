import { UserRoleTypes } from './../user/types/user-role.types';
import { RolesGuard } from './../auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/authGuard.guard';
import { UpdateMenuDto } from './dto/updateMenuDto.dto';
import { UpdateResult } from 'typeorm';
import { CreateMenuDto } from './dto/create-menu.dto';
import { MenuService } from './menu.service';
import { Body, Controller, Delete, Param, Post, Put, UseGuards } from "@nestjs/common";
import { MenuEntity } from './entity/menu.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService) { }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('create')
    @ApiBody({type: CreateMenuDto})
    async createMenu(@Body() createMenuDto: CreateMenuDto): Promise<MenuEntity> {
        return await this.menuService.createMenu(createMenuDto)
    }

    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Put('update')
    @ApiBody({type: UpdateMenuDto})
    async updateMenu(@Body() updateMenuDto: UpdateMenuDto): Promise<MenuEntity> {
        return await this.menuService.updateMenu(updateMenuDto)
    }
    
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Delete('delete/:id')
    @ApiParam({name: 'id'})
    async deleteMenu(@Param('id') menuId: number) {
        return await this.menuService.deleteMenu(menuId)
    }
}