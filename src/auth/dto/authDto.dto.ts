import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({ example: 'tima' })
  name: string;
  @ApiProperty({ example: '055555555' })
  phone: string;
  @ApiProperty({ example: 'bularov@mail.ru' })
  email: string;
}
