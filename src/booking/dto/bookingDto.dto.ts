import { ApiProperty } from '@nestjs/swagger';
export class BookingDto {
  @ApiProperty({ example: '1' })
  seatsCount: number;
  @ApiProperty({ example: '2022-06-06 12:00:00' })
  dateTime: Date;
  @ApiProperty({ example: '1' })
  tableId: number;
}
