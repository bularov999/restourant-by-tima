import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ example: 'tima123@gmail.com' })
  email: string;
  @ApiProperty({ example: 'Tema' })
  name: string;
}
