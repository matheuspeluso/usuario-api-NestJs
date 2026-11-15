import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service.js';
import { AuthRequestDto } from '../../dtos/auth-request.dto.js';
import { AuthResponseDto } from '../../dtos/auth-response.dto.js';
import { UsuarioRequestDto } from '../../dtos/usuario-request.dto.js';
import { UsuarioResponseDto } from '../../dtos/usuario-response.dto.js';


@Controller('auth')
export class AuthController {

    //construtor (injeção de dependência)
    constructor(
        private authService: AuthService
    ) {}

    @Post("auth")
    async auth(@Body(new ValidationPipe()) request: AuthRequestDto) : Promise<AuthResponseDto>{
        return await this.authService.autenticarUsuario(request);
    }

    @Post("create")
    async create(@Body(new ValidationPipe()) request: UsuarioRequestDto) : Promise<UsuarioResponseDto> {
        return await this.authService.criarUsuario(request);
    }
}
