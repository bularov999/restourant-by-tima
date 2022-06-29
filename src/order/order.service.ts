import { ApiError } from './../lib/errors/api.error';
import { BookingService } from './../booking/booking.service';
import { UpdateOrderDto } from './dto/updateOrderDto';
import { CreateOrderDto } from './dto/createOrderDto.dto';
import { OrderEntity } from './entity/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ResponseOrderCountAndPriceDto } from './dto/responseOrderCountAndPriceDto.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
    private readonly bookingService: BookingService,
  ) {}
  async createOrder(
    createOrderDto: CreateOrderDto[],
    bookingId: number,
  ): Promise<ResponseOrderCountAndPriceDto> {
    const booking = await this.bookingService.getOneBookingById(bookingId);
    if (!booking) throw ApiError.notFound('this booking was not found');
    const instances = createOrderDto.map((dto) =>
      this.orderRepository.create({
        menu: {
          id: dto.menuId,
        },
        price: {
          id: dto.priceId,
        },
        booking: {
          id: bookingId,
        },
        count: dto.count,
      }),
    );
    await this.orderRepository.save(instances);

    const allOrders = await this.getOrdersByBooking(bookingId);
    const obj = {
      count: 0,
      price: 0,
    };
    allOrders.forEach((item) => {
      obj.count += item.count;
      obj.price += item.price.price * item.count;
    });

    return obj;
  }
  async updateOrder(
    updateOrderDto: UpdateOrderDto[],
    bookingId: number,
  ): Promise<ResponseOrderCountAndPriceDto> {
    const instances = updateOrderDto.map((dto) =>
      this.orderRepository.create({
        id: dto.orderId,
        menu: {
          id: dto.menuId,
        },
        price: {
          id: dto.priceId,
        },
        booking: {
          id: bookingId,
        },
        count: dto.count,
      }),
    );
    await this.orderRepository.save(instances);

    const allOrders = await this.getOrdersByBooking(bookingId);
    const obj = {
      count: 0,
      price: 0,
    };
    allOrders.forEach((item) => {
      obj.count += item.count;
      obj.price += item.price.price * item.count;
    });

    return obj;
  }
  async getOrdersByBooking(bookingId: number): Promise<OrderEntity[]> {
    return await this.orderRepository.find({
      where: { booking: { id: bookingId } },
      relations: {
        price: true,
      },
    });
  }
  async deleteOrder(orderid: number): Promise<DeleteResult> {
    return await this.orderRepository.delete({ id: orderid });
  }
}
