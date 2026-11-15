import { ApiProperty } from "@nestjs/swagger";
import {IsString, IsEmail, Length} from 'class-validator';

export class AuthRequestDto{

    @ApiProperty({type: String, description: "Email do usuário."})
    @IsEmail({}, {message: 'Informe um endereço de email válido.',})
    @IsString({message: 'O email deve ser do tipo texto'})
    email: string;
    
    @ApiProperty({type: String, description: "Senha do usuário."})
    @Length(8,20, {message: 'A senha deve ter de 8 a 20 caracteres.'})
    @IsString({message: 'A senha deve ser do tipo texto.'})
    senha: string;
}