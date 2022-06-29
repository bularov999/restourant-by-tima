import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateOrderDto {
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
