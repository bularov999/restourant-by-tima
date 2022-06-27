import { ApiProperty } from "@nestjs/swagger";

export class CreateTableDto {
    @ApiProperty({name: 'b'})
    group: string;
    @ApiProperty({name: '1'})
    index: number;
    @ApiProperty({name: '5'})
    seatsCount: number; 
}