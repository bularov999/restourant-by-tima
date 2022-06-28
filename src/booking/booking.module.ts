import { UserEntity } from '../user/entity/user.entity';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { BookingEntity } from './entity/booking.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([BookingEntity, UserEntity])],
  providers: [BookingService],
  controllers: [BookingController],
})
export class BookingModule {}
