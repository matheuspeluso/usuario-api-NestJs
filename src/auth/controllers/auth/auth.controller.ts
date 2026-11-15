import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../../service/auth/auth.service.js';
import { AuthRequestDto } from '../../dtos/auth-request.dto.js';
import { AuthResponseDto } from '../../dtos/auth-response.dto.js';


@Controller('auth')
export class AuthController {

    //construtor (injeção de dependência)
    constructor(
        private authService: AuthService
    ) {}

    @Post()
    async post(@Body() request: AuthRequestDto) : Promise<AuthResponseDto>{
        return this.authService.autenticarUsuario(request);
    }
}
