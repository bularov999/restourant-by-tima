import { TableService } from './../table/table.services';
import { UserEntity } from 'src/user/entity/user.entity';
import { BookingStatusTypes } from './types/booking.types';
import { ApiError } from '../lib/errors/api.error';
import { BookingDto } from './dto/bookingDto.dto';
import { BookingEntity } from './entity/booking.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { BookingPaidStatusType } from './types/bookingPaidStatus.types';
Injectable();
export class BookingService {
  constructor(
    @InjectRepository(BookingEntity)
    private readonly bookingRepository: Repository<BookingEntity>,
    private readonly tableService: TableService,
  ) {}

  async createBooking(
    user: UserEntity,
    bookingDto: BookingDto,
  ): Promise<BookingEntity> {
    const table = await this.tableService.getOneTable(bookingDto.tableId);
    if (!table) throw ApiError.notFound('this table is not exist');
    const booking = this.bookingRepository.create(bookingDto);
    booking.user = user;
    booking.table.id = bookingDto.tableId;
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
  async changeBookingPaidStatus(bookingId: number) {
    return await this.bookingRepository.update(
      { id: bookingId },
      { paidStatus: BookingPaidStatusType.PAID },
    );
  }
  async getOneBookingById(bookingId: number): Promise<BookingEntity> {
    return await this.bookingRepository.findOneBy({id: bookingId})
  }
}
