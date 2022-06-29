import { ApiProperty } from '@nestjs/swagger';

export class ModeratorDto {
  @ApiProperty({ example: 'tima@gmail.com' })
  email: string;
  @ApiProperty({ example: '05555555' })
  phone: string;
  @ApiProperty({ example: 'Tima' })
  name: string;
  @ApiProperty({ example: '12345' })
  password: string;
  @ApiProperty({ example: 'moderator' })
  role: string;
}
