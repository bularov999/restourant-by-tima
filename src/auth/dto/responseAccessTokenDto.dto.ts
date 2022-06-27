import { ApiProperty } from "@nestjs/swagger";

export class ResponseAccessTokenDto {
    @ApiProperty({example: 'askmmldklmfa'})
    access_token: string;
}