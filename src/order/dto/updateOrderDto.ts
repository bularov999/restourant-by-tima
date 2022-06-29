import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({ example: '1' })
  orderId: number;
  @ApiProperty({ example: '1' })
  menuId: number;
  @ApiProperty({ example: '1' })
  priceId: number;
  @ApiProperty({ example: '2' })
  count: number;
}
