import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateTableDto {
  @ApiProperty({ example: 'b' })
  @IsNotEmpty()
  group: string;
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  index: number;
  @ApiProperty({ example: 5 })
  @IsNotEmpty()
  seatsCount: number;
}
