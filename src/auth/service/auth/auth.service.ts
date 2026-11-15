import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from '../../dtos/auth-request.dto.js';
import { AuthResponseDto } from '../../dtos/auth-response.dto.js';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService){}

    //método para realizar a autenticação do usuário
    async autenticarUsuario(request: AuthRequestDto): Promise<AuthResponseDto>{
        if(request.email == 'admin@sistema.com' && request.senha == "@Admin123"){
            const response = new AuthResponseDto();
            response.email = request.email;
            response.accessToken = this.generateToken(request.email);
            response.dataHoraAcesso = new Date();
            return await response;
        }else{
            throw new UnauthorizedException('Acesso negado. Usuário inválido.');
        }
    };

    generateToken(emailUsuario: string){
        return this.jwtService.sign(
            {
                email: emailUsuario
            },
            {
                secret: 'fed2e3b2-0ef2-40ab-87ba-7fb0721be55f',
                issuer: "devmatheuspeluso",
                expiresIn: '1h'
            }
        );
    };
}
