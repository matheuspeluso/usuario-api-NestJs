import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequestDto } from '../../dtos/auth-request.dto.js';
import { AuthResponseDto } from '../../dtos/auth-response.dto.js';
import { Repository } from 'typeorm';
import { UsuarioEntity } from '../../entities/usuario.entity.js';
import { UsuarioRequestDto } from '../../dtos/usuario-request.dto.js';
import { UsuarioResponseDto } from '../../dtos/usuario-response.dto.js';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        @InjectRepository(UsuarioEntity)
        private usuarioRepository: Repository<UsuarioEntity>,
    ) { }

    async criarUsuario(request: UsuarioRequestDto): Promise<UsuarioResponseDto> {
        //verificando se o email informado já esta cadastrado
        if (await this.usuarioRepository.findOne({ where: { email: request.email } }))
            throw new UnprocessableEntityException('O email já está cadastrado, tente outro.');

        //criando um objeto usuário(entidade)
        const usuario = this.usuarioRepository.create({
            nome: request.nome,
            email: request.email,
            senha: this.encrypt(request.senha)
        });

        //salvar no banco de dados
        const result = await this.usuarioRepository.save(usuario);

        //retornando os dados do usuário criado
        const response = new UsuarioResponseDto();
        response.id = result.id;
        response.nome = result.nome;
        response.email = result.email;
        response.dataHoraCadastro = new Date();

        return response;
    }

    //método para realizar a autenticação do usuário
    async autenticarUsuario(request: AuthRequestDto): Promise<AuthResponseDto> {

        //busca o usuário no banco de dados atravez do email e da senha
        const usuario = await this.usuarioRepository.findOne({
            where: { email: request.email, senha: this.encrypt(request.senha) }
        });

        if (usuario != null) {
            const response = new AuthResponseDto();
            response.id = usuario.id;
            response.nome = usuario.nome;
            response.email = usuario.email;
            response.accessToken = this.generateToken(usuario.email);
            response.dataHoraAcesso = new Date();

            return response;
        } else {
            throw new UnauthorizedException("Acesso negado. Usuário inválido.");
        }


    };

    generateToken(emailUsuario: string) {
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

    encrypt(value: string): string {
        const sha1 = crypto.createHash('sha1');
        sha1.update(value);
        return sha1.digest('hex');
    }
}
