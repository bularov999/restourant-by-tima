import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOnePriceDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @ApiProperty({ example: '300' })
  @IsNotEmpty()
  @IsNumber()
  size: number;
  @ApiProperty({ example: '300' })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
