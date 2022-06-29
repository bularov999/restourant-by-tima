import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty({ example: '300' })
  @IsNotEmpty()
  @IsNumber()
  size: number;
  @ApiProperty({ example: '300' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
