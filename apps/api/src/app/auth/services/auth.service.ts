import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {JwtService} from "@nestjs/jwt";
import {compare} from "bcrypt";
import {isAfter} from "date-fns";
import {TokenService} from "./token.service";
import {UserService} from "./user.service";

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  login(user: any) {
    return this._signUser(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findOne(username);
    if (user && await compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async generateRefreshToken(user: any, platform: string, ipAddress: string) {
    const token = await this.tokenService.generate(user, platform, ipAddress)
    return token.token;
  }

  async refreshToken(token: string, platform: string, ipAddress: string) {
    const session = await this.tokenService.findOne(token);
    if (!session) throw new NotFoundException();

    if (isAfter(new Date(), session.expiredAt))
      throw new BadRequestException();

    await this.tokenService.invalidate(session);

    const newRefreshToken = await this.tokenService.generate(session.user, platform, ipAddress);
    return {
      access: this._signUser(session.user),
      refresh: newRefreshToken.token
    }
  }

  private _signUser(user:{username: string, id: number}) {
    const payload = { username: user.username, sub: user.id };
    return this.jwtService.sign(payload);
  }

  async logout(user:any, token: string) {
    const session = await this.tokenService.findOne(token);

    if (session)
      await this.tokenService.invalidate(session);

    await this.tokenService.removeAllInvalidTokens();
  }
}
