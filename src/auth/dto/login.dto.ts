import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @ApiProperty({
        description: 'email',
        example: 'bularov@mail.ru'
      })
    email: string;
    @ApiProperty({
        description: 'password',
        example: '12345'
    })
    password: string;
}