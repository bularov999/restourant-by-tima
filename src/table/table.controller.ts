import { UserRoleTypes } from './../user/types/user-role.types';
import { RolesGuard } from './../auth/guards/roles.guard';
import { AuthGuard } from 'src/auth/guards/authGuard.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { UpdateTableDto } from './dto/updateTableDto.dto';
import { TableEntity } from './entity/table.entity';
import { CreateTableDto } from './dto/createTableDto.dto';
import { TableService } from './table.services';
import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) { }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('create')
    @ApiBody({type: CreateTableDto})
    async createTable(@Body() createTable: CreateTableDto): Promise<TableEntity> {
        return await this.tableService.createTable(createTable)
    }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('update')
    @ApiBody({type: UpdateTableDto})
    async updateTable(@Body() updateTabelDto: UpdateTableDto): Promise<TableEntity> {
        return await this.tableService.updateTable(updateTabelDto)
    }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Delete('delete/:id')
    @ApiParam({name: 'id'})
    async deleteTable(@Param('id') tabelId: number): Promise<DeleteResult> {
        return await this.tableService.deleteTable(tabelId)
    }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('block/:id')
    @ApiParam({name: 'id'})
    async blockTable(@Param('id') tableId: number): Promise<UpdateResult> {
        return await this.tableService.blockTable(tableId)
    }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Post('un-block/:id')
    @ApiParam({name: 'id'})
    async unblock(@Param('id') tableId: number) : Promise<UpdateResult>{
        return await this.tableService.unblockTable(tableId)
    }
}