import { ApiProperty } from '@nestjs/swagger';
export class CreateFileDto {
    @ApiProperty({example: 'id'})
    id: string;
    @ApiProperty({example: 'application/img'})
    contentType: string;
    @ApiProperty({example: '1024'})
    size: number;
  }