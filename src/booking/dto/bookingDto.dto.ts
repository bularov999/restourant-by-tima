import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber } from 'class-validator';
export class BookingDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  seatsCount: number;
  @ApiProperty({ example: '2022-06-06 12:00:00' })
  @IsNotEmpty()
  @IsDate()
  dateTime: Date;
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  tableId: number;
}
