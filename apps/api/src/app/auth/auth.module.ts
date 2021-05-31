import {Module} from '@nestjs/common';
import {JwtModule} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";
import {environment} from "../../environments/environment";
import {AuthController} from './controllers/auth.controller';
import {UserController} from "./controllers/user.controller";
import {AuthLocalGuard} from "./guards/auth-local.guard";
import {JwtAuthGuard} from "./guards/jwt.guard";
import {TokenEntity} from "./entities/token.entity";
import {UserEntity} from "./entities/user.entity";
import {AuthService} from './services/auth.service';
import {TokenService} from "./services/token.service";
import {UserService} from "./services/user.service";
import {AuthLocalStrategy} from "./strategies/auth-local.strategy";
import {JwtStrategy} from "./strategies/jwt.strategy";

@Module({
  imports: [
    JwtModule.register({
      secret: environment.jwt.secret,
      signOptions: { expiresIn: environment.jwt.expires },
    }),
    TypeOrmModule.forFeature([UserEntity, TokenEntity]),
    PassportModule
  ],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService
    },
    AuthService,
    UserService,
    TokenService,

    AuthLocalGuard,
    AuthLocalStrategy,
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [
    AuthService,
    UserService,
    JwtAuthGuard
  ],
  controllers: [
    AuthController,
    UserController
  ]
})
export class AuthModule {}
