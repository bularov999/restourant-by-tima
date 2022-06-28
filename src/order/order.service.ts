import { CreateOrderDto } from './dto/createOrderDto.dto';
import { OrderEntity } from './entity/order.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto[], bookingId: number) {
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
      size: 0,
    };
    allOrders.forEach((item) => {
      obj.count += item.count;
      obj.price += item.price.price;
      obj.size += item.price.size;
    });
    return obj;
  }

  async getOrdersByBooking(bookingId) {
    return await this.orderRepository.find({
      where: { booking: { id: bookingId } },
      relations: {
        price: true,
      },
    });
  }
}
