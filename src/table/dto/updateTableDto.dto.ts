import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiProperty({ name: '1' })
  id: number;
  @ApiProperty({ name: 'b' })
  group: string;
  @ApiProperty({ name: '1' })
  index: number;
  @ApiProperty({ name: '5' })
  seatsCount: number;
}
