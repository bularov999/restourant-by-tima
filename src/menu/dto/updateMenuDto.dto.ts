import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../file/entity/file.entity';
export class UpdateMenuDto {
  @ApiProperty({ example: '1' })
  @IsNotEmpty()
  @IsNumber()
  id: number;
  @ApiProperty({ example: 'main' })
  type: string;
  @ApiProperty({ example: 'salad' })
  mainMenuType: string;
  @ApiProperty({ example: 'name' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ example: 'description' })
  @IsNotEmpty()
  description: string;
  @ApiProperty({ example: '[asd12das]' })
  picturesId: string[];
  pictures?: FileEntity[];
}
