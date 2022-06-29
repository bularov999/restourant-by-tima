import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @ApiProperty({ example: 'tima' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: '055555555' })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ example: 'bularov@mail.ru' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
