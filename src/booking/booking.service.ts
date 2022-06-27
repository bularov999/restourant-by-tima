import { UserEntity } from 'src/user/entity/user.entity';
import { BookingStatusTypes } from './types/booking.types';
import { ApiError } from './../lib/errors/api.error';
import { BookingDto } from './dto/bookingDto.dto';
import { BookingEntity } from './entity/booking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
Injectable()
export class BookingService {
    constructor(@InjectRepository(BookingEntity) private bookingRepository: Repository<BookingEntity>) { }

    async createBooking(user: UserEntity, bookingDto: BookingDto): Promise<BookingEntity> {
        const booking = this.bookingRepository.create(bookingDto)
        booking.user = user
        booking.table = bookingDto.table
        await this.bookingRepository.save(booking)
        return booking
    }
    async denieBooking(id: number): Promise<UpdateResult> {
        const booking = await this.bookingRepository.findOne({
            where: { id },
        })
        if (!booking) throw ApiError.notFound('booking not found')
        const updatedBooking = await this.bookingRepository.update({ id }, { status: BookingStatusTypes.DENIED })
        return updatedBooking
    }
    async approveBooking(id: number) {
        const booking = await this.bookingRepository.findOne({
            where: { id },
        })
        if (!booking) throw ApiError.notFound('booking not found')
        const updatedBooking = await this.bookingRepository.update({ id }, { status: BookingStatusTypes.APPROVED })
        return updatedBooking
    }
    async deleteBooking(id: number): Promise<DeleteResult> {
        const booking = await this.bookingRepository.delete(id)
        return booking
    }
    async getAllBookings(): Promise<BookingEntity[]> {
        const bookings: BookingEntity[] = await this.bookingRepository.find()
        return bookings
    }
}