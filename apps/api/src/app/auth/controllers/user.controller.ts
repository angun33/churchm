import {Body, Controller, Post} from '@nestjs/common';
import {ApiBadRequestResponse, ApiBearerAuth, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../dtos/create-user.dto";
import {UserService} from "../services/user.service";

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private userService:UserService) {
  }

  @ApiBadRequestResponse()
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
