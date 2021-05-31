import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, Length, Matches, MinLength} from "class-validator";
import {User} from "../entities/user.entity";

export class CreateUserDto implements Omit<User, 'id'> {
  @ApiProperty()
  @Length(3, 255, { message: 'Username must be greater than 3 characters' })
  username: string;

  @ApiProperty()
  @MinLength(8, { message: 'Password must be greater than 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must have lowercase, uppercase, and special character'})
  password: string;

  @ApiProperty()
  @IsEmail()
  email: string
}
