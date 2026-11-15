import { ApiProperty } from "@nestjs/swagger";

export class AuthRequestDto{

    @ApiProperty({type: String, description: "Email do usuário."})
    email: string;

    @ApiProperty({type: String, description: "Senha do usuário."})
    senha: string;
}