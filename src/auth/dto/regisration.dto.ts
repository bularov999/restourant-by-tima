import { ApiProperty } from "@nestjs/swagger";

export class RegistrationDto {
    @ApiProperty({
        example: 'bularov@mail.ru'
    })
    email: string;
    @ApiProperty({
        example: '0702580823'
    })
    phone: string;
    @ApiProperty({
        example: 'tima'
    })
    name: string;
    @ApiProperty({
        example: 'bularov'    
    })
    surname: string;
    @ApiProperty({
        example: '12345'
    })
    password: string;
}