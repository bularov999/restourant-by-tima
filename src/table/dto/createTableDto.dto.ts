import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({ example: 'b' })
  group: string;
  @ApiProperty({ example: 1 })
  index: number;
  @ApiProperty({ example: 5 })
  seatsCount: number;
}
