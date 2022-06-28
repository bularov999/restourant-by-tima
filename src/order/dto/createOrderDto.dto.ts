import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '1' })
  menuId: number;
  @ApiProperty({ example: '1' })
  priceId: number;
  @ApiProperty({ example: '2' })
  count: number;
}
