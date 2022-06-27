import { CreatePriceDto } from './../../price/dto/createPriceDto.dto';
import { MainMenuTypes } from './../types/mainMenuTypes.type';
import { MenuTypes } from './../types/menyTypes.type';
import { FileEntity } from './../../file/entity/file.entity';
import { ApiProperty } from '@nestjs/swagger';
export class CreateMenuDto {
    @ApiProperty({example: 'menu'})
    type: MenuTypes;
    @ApiProperty({example: 'soups'})
    mainMenuTypes: MainMenuTypes;
    @ApiProperty({example: '12312321'})
    pictureIds: string[];
    pictures?: FileEntity[];
    @ApiProperty({example: 'hash'})
    name: string;
    @ApiProperty({example: 'description'})
    description: string;
}