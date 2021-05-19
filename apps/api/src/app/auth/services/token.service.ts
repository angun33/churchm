import {ConflictException, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {randomBytes} from "crypto";
import {addDays} from "date-fns";
import {Repository} from "typeorm";
import {environment} from "../../../environments/environment";
import {UserEntity} from "../models/user.entity";
import {TokenEntity} from "../models/token.entity";

@Injectable()
export class TokenService {
  constructor(@InjectRepository(TokenEntity) private repo:Repository<TokenEntity>)
  {}

  async findOne(token: string) {
    if (token === null || token === undefined) return null;
    return this.repo.findOne({token}, { relations: ['user'] });
  }

  async generate(user:UserEntity, platform:string, ipAddress)
  {
    const MAX_TRIES = 5;
    let tries = 0;
    let token = (await randomBytes(32)).toString('hex');
    let duplicate = null;

    // Generate a unique token
    while ((duplicate = await this.repo.findOne({token})) && tries++ < MAX_TRIES) {
      token = (await randomBytes(32)).toString('hex');
    }

    if (tries > MAX_TRIES)
      throw new ConflictException('Conflict while generating token')

    const entity = this.repo.create({
      token,
      expiredAt: addDays(new Date, environment.jwt.refresh_expires),
      ipAddress,
      platform,
      user
    });

    return this.repo.save(entity);
  }

  async invalidate(token: TokenEntity) {
    await this.repo.delete(token.token);
  }

  async removeAllInvalidTokens() {
    await this.repo.createQueryBuilder()
      .delete()
      .where('expiredAt <= :date', { date: new Date() })
      .execute()
  }
}
