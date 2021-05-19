import {IsEmail, Length, Matches, MinLength} from "class-validator";

export class CreateUserDto {
  @Length(3, 255, { message: 'Username must be greater than 3 characters' })
  username: string;

  @MinLength(8, { message: 'Password must be greater than 8 characters' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'Password must have lowercase, uppercase, and special character'})
  password: string;

  @IsEmail()
  email: string
}
