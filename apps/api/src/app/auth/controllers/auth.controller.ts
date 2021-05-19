import {Controller, Get, Inject, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {environment} from "../../../environments/environment";
import {AuthLocalGuard} from "../guards/auth-local.guard";
import {Public} from "../guards/jwt.guard";
import {AuthService} from "../services/auth.service";

@Controller('auth')
export class AuthController {
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

    res.cookie('refresh_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: environment.production,
      signed: true
    });

    return {
      access_token: this.authService.login(req.user)
    };
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Req() req:Request, @Res({ passthrough: true }) res:Response) {
    const token = await this.authService.refreshToken(
      req.signedCookies['refresh_token'],
      req.header('user-agent'),
      req.ip
    )

    res.cookie('refresh_token', token.refresh, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
      secure: environment.production,
      signed: true
    });

    return {
      access_token: token.access
    };
  }

  @Get('logout')
  logout(@Req() req:Request, @Res({ passthrough: true }) res:Response) {
    this.authService.logout(
      req.user,
      req.signedCookies['refresh_token']
    );

    res.clearCookie('refresh_token');
  }
}
