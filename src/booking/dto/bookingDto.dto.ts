import { ApiProperty } from '@nestjs/swagger';
import { TableEntity } from '../../table/entity/table.entity';
export class BookingDto {
  @ApiProperty({ example: '5' })
  seatsCount: number;
  @ApiProperty({ example: '2022-06-06 12:00:00' })
  dateTime: Date;
  @ApiProperty({ example: 'table entity' })
  table: TableEntity;
}
