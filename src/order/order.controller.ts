import { CreateOrderDto } from './dto/createOrderDto.dto';
import { OrderService } from './order.service';
import { Body, Controller, Param, Post } from "@nestjs/common";
import { ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) { }
    @Post('create/:bookingId')
    @ApiParam({name: 'bookingId'})
    @ApiBody({type: CreateOrderDto})
    async createOrder(@Param('bookingId') bookingId: number, @Body() createOrderDto: CreateOrderDto[]) {
        return await this.orderService.createOrder(createOrderDto, bookingId)
    }
}