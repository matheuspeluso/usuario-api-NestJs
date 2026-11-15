import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller.js';
import { AuthService } from './service/auth/auth.service.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioEntity } from './entities/usuario.entity.js';

@Module({
  imports: [
    PassportModule,
    JwtModule,
    TypeOrmModule.forFeature([
      UsuarioEntity
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
