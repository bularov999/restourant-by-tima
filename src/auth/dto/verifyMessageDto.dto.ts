import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyMessageDto {
  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
  @ApiProperty({ example: 1234 })
  @IsNotEmpty()
  @IsNumber()
  code: number;
}
