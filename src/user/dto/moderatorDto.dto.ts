import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ModeratorDto {
  @ApiProperty({ example: 'tima@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: '05555555' })
  @IsNotEmpty()
  phone: string;
  @ApiProperty({ example: 'Tima' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  password: string;
  @ApiProperty({ example: 'moderator' })
  @IsNotEmpty()
  role: string;
}
