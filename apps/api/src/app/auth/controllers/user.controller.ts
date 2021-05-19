import {Body, Controller, Post} from '@nestjs/common';
import {CreateUserDto} from "../dtos/create-user.dto";
import {UserService} from "../services/user.service";


@Controller('user')
export class UserController {
  constructor(private userService:UserService) {
  }

  @Post()
  async createUser(@Body() createUser:CreateUserDto) {
    const user = await this.userService.createUser(
      createUser.username,
      createUser.password,
      createUser.email
    );
    return user.id;
  }
}
