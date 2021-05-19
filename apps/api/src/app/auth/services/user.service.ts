import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {genSalt, hash} from "bcrypt";
import {isEmpty} from "class-validator";
import {Repository} from "typeorm";
import {UserEntity} from "../models/user.entity";

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private userRepo:Repository<UserEntity>)
  {}

  async findOne(username: string): Promise<UserEntity | undefined> {
    if (username === null || username === undefined) return null;

    return this.userRepo.findOne({username})
  }

  async createUser(username: string, password: string, email: string) {
    if (isEmpty(password))
      throw new Error('Password cannot be empty');

    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    const user = this.userRepo.create({
      username,
      password: hashedPassword,
      email
    });
    return this.userRepo.save(user);
  }
}
