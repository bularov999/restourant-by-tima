import { UserEntity } from 'src/user/entity/user.entity';
import { BookingStatusTypes } from './types/booking.types';
import { ApiError } from '../lib/errors/api.error';
import { BookingDto } from './dto/bookingDto.dto';
import { BookingEntity } from './entity/booking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
Injectable();
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private bookingRepository: Repository<BookingEntity>,
  ) {}

  async createBooking(
    user: UserEntity,
    bookingDto: BookingDto,
  ): Promise<BookingEntity> {
    const booking = this.bookingRepository.create(bookingDto);
    booking.user = user;
    booking.table = bookingDto.table;
    return await this.bookingRepository.save(booking);
  }
  async denieBooking(id: number): Promise<UpdateResult> {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) throw ApiError.notFound('booking not found');
    return await this.bookingRepository.update(
      { id },
      { status: BookingStatusTypes.DENIED },
    );
  }
  async approveBooking(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
    });
    if (!booking) throw ApiError.notFound('booking not found');
    return await this.bookingRepository.update(
      { id },
      { status: BookingStatusTypes.APPROVED },
    );
  }
  async deleteBooking(id: number): Promise<DeleteResult> {
    return await this.bookingRepository.delete(id);
  }
  async getAllBookings(): Promise<BookingEntity[]> {
    return await this.bookingRepository.find();
  }
  async getBookingByUserId(userId: number) {
    return await this.bookingRepository.find({
      where: { user: { id: userId } },
    });
  }
}
