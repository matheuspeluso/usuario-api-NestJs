import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length,  } from "class-validator";
import { ConfirmarSenha } from "../../common/validators/confirmar-senha.validator.js";

export class UsuarioRequestDto{

    @ApiProperty({type: String, description: "Nome do usuário."})
    @IsString({message: 'O nome deve ser do tipo texto.'})
    @Length(5, 100, {message: 'O nome deve ter de 5 a 50 caracteres.'})
    nome: string;

     @ApiProperty({type: String, description: "Email do usuário."})
    @IsString({message: 'O email deve ser do tipo texto.'})
    @IsEmail({}, {message: 'Informe um endereço de email válido.'})
    email: string;

     @ApiProperty({type: String, description: "Senha do usuário."})
    @Length(8,20, {message: 'A senha deve ter de 8 a 20 caracteres.'})
    @IsString({message: 'A senha deve ser do tipo texto.'})
    senha: string;

     @ApiProperty({type: String, description: "Senha de confirmação do usuário."})
    @IsString({message: 'A senha deve ser do tipo texto.'})
    @ConfirmarSenha()
    senhaConfirmacao: string;
}