import {Controller, Get, Inject, Post, Req, Res, UseGuards} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {Request, Response} from 'express';
import {environment} from "../../../environments/environment";
import {AuthLocalGuard} from "../guards/auth-local.guard";
import {Public} from "../guards/jwt.guard";
import {AuthService} from "../services/auth.service";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  readonly COOKIE_NAME = 'refresh_token';

  private cookieOptions = {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: environment.production,
    signed: true
  };

  constructor(@Inject('AUTH_SERVICE') private readonly authService:AuthService) {
  }

  @UseGuards(AuthLocalGuard)
  @Public()
  @Post('login')
  async login(@Req() req:Request, @Res({ passthrough: true }) res:Response) {
    const token = await this.authService.generateRefreshToken(
      req.user,
      req.header('user-agent'),
      req.ip
    );

    res.cookie(this.COOKIE_NAME, token, this.cookieOptions);

    return {
      access_token: this.authService.login(req.user)
    };
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Req() req:Request, @Res({ passthrough: true }) res:Response) {
    const token = await this.authService.refreshToken(
      req.signedCookies[this.COOKIE_NAME],
      req.header('user-agent'),
      req.ip
    )

    res.cookie(this.COOKIE_NAME, token.refresh, this.cookieOptions);

    return {
      access_token: token.access
    };
  }

  @Public()
  @Get('logout')
  async logout(@Req() req:Request, @Res({ passthrough: true }) res:Response) {
    await this.authService.logout(
      req.user,
      req.signedCookies[this.COOKIE_NAME]
    );

    res.clearCookie(this.COOKIE_NAME, this.cookieOptions);
  }
}
