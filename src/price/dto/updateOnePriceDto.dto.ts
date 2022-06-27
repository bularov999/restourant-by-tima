import { ApiProperty } from "@nestjs/swagger";

export class UpdateOnePriceDto {
    @ApiProperty({example: '1'})
    id: number;
    @ApiProperty({example: '300'})
    size: number;
    @ApiProperty({example: '300'})
    price: number;
}