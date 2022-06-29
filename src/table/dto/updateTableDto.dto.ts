import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiProperty({ example: 1 })
  id: number;
  @ApiProperty({ example: 'a' })
  group: string;
  @ApiProperty({ example: 2 })
  index: number;
  @ApiProperty({ example: 12 })
  seatsCount: number;
}
