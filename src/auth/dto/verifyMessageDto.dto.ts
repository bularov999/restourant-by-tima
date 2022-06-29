import { ApiProperty } from '@nestjs/swagger';

export class VerifyMessageDto {
  @ApiProperty({ example: 1 })
  userId: number;
  @ApiProperty({ example: 1234 })
  code: number;
}
