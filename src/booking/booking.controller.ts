import { AuthGuard } from 'src/auth/guards/authGuard.guard';
import { UserRoleTypes } from './../user/types/user-role.types';
import { RolesGuard } from './../auth/guards/roles.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { BookingService } from './booking.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { BookingEntity } from './entity/booking.entity';
import { BookingDto } from './dto/bookingDto.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { UserDecorator } from 'src/user/decorator/userDecorator.decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('booking')
export class BookingController {
    constructor(private readonly bookingService: BookingService) { }
    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Get('get-all')
    async getAllBookings(): Promise<BookingEntity[]> {
        return await this.bookingService.getAllBookings()
    }

    @UseGuards(AuthGuard)
    @Post('create')
    @ApiBody({type: BookingDto})
    async createBooking(@UserDecorator() user: UserEntity, @Body() bookingDto: BookingDto): Promise<BookingEntity> {
        return await this.bookingService.createBooking(user, bookingDto)
    }


    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Put('denie/:id')
    async denieBooking(@Param('id') bookingId: number): Promise<UpdateResult> {
        return await this.bookingService.denieBooking(bookingId)
    }

    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Put('approve/:id')
    @ApiParam({name: 'id'})
    async approveBooking(@Param('id') bookingId: number): Promise<UpdateResult> {
        return await this.bookingService.approveBooking(bookingId)
    }


    @UseGuards(AuthGuard)
    @UseGuards(RolesGuard)
    @Roles(UserRoleTypes.ADMIN)
    @Delete('delete/:id')
    @ApiParam({name: 'id'})
    async deleteBooking(@Param('id') bookingId: number): Promise<DeleteResult> {
        return await this.bookingService.deleteBooking(bookingId)
    }
}