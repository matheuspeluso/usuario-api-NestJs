import { ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto {

    @ApiProperty({type: String, description: "Id do usuário."})
    id: number;

    @ApiProperty({type: String, description: "Nome do usuário."})
    nome: string;

    @ApiProperty({type: String, description:"Email do usuario."})
    email: string;

    @ApiProperty({type: String, description:"Data e hora de acesso."})
    dataHoraAcesso: Date | null;

    @ApiProperty({type: String, description: "token Jwt de acesso."})
    accessToken: string;
}