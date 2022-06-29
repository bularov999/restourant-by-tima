import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateTableDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  id: number;
  @ApiProperty({ example: 'a' })
  @IsNotEmpty()
  group: string;
  @ApiProperty({ example: 2 })
  @IsNotEmpty()
  index: number;
  @ApiProperty({ example: 12 })
  @IsNotEmpty()
  seatsCount: number;
}
