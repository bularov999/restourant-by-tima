import { ResponseOrderCountAndPriceDto } from './dto/responseOrderCountAndPriceDto.dto';
import { UpdateOrderDto } from './dto/updateOrderDto';
import { CreateOrderDto } from './dto/createOrderDto.dto';
import { OrderService } from './order.service';
import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @ApiTags('Order controller')
  @ApiOperation({ summary: 'Create Order' })
  @ApiBearerAuth('defaultBearerAuth')
  @Post('create/:bookingId')
  @ApiParam({ name: 'bookingId' })
  @ApiBody({ type: CreateOrderDto })
  async createOrder(
    @Param('bookingId') bookingId: number,
    @Body() createOrderDto: CreateOrderDto[],
  ): Promise<ResponseOrderCountAndPriceDto> {
    return await this.orderService.createOrder(createOrderDto, bookingId);
  }
  @ApiTags('Order controller')
  @ApiOperation({ summary: 'Update Order' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiParam({ name: 'bookingId' })
  @ApiBody({ type: UpdateOrderDto })
  @Patch('update/:bookingId')
  async updateOrder(
    @Param('bookingId') bookingId: number,
    @Body() updateOrderDto: UpdateOrderDto[],
  ): Promise<ResponseOrderCountAndPriceDto> {
    return await this.orderService.updateOrder(updateOrderDto, bookingId);
  }
  @ApiTags('Order controller')
  @ApiOperation({ summary: 'delete Order' })
  @ApiBearerAuth('defaultBearerAuth')
  @ApiParam({ name: 'orderId' })
  @Delete('delete/:orderId')
  async deleteOrder(@Param('orderId') orderId: number): Promise<DeleteResult> {
    return await this.orderService.deleteOrder(orderId);
  }
}
