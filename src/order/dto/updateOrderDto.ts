import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  orderId: number;
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  menuId: number;
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  priceId: number;
  @ApiProperty({ example: '2' })
  @IsNotEmpty()
  @IsNumber()
  count: number;
}
