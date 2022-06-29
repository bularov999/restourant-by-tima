import { ApiProperty } from '@nestjs/swagger';

export class AdminAuthDto {
  @ApiProperty({ example: 'admin@gmail.com' })
  email: string;
  @ApiProperty({ example: '1234' })
  password: string;
}
