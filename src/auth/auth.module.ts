import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth/auth.controller.js';
import { AuthService } from './service/auth/auth.service.js';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
