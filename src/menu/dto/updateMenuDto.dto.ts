import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../../file/entity/file.entity';
export class UpdateMenuDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: 'main'})
    type: string;
    @ApiProperty({example: 'salad'})
    mainMenuType: string;
    @ApiProperty({example: 'name'})
    name: string;
    @ApiProperty({example: 'description'})
    description: string;
    @ApiProperty({example: '[asd12das]'})
    picturesId: string[];
    pictures?: FileEntity[];
}