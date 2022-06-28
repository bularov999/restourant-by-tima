import { ApiProperty } from '@nestjs/swagger';

export class CreatePriceDto {
  @ApiProperty({ example: '300' })
  size: number;
  @ApiProperty({ example: '300' })
  price: number;
}
