import { RegisterDTO } from './dto/register.dto';
import { UserService } from './user.service';
import { Controller, Post, Body } from '@nestjs/common';



@Controller('user')
  export class UserController {
    constructor(private UserService: UserService) {};
    @Post()
    async Register(
      @Body() newUser: RegisterDTO
    ) {
        return await this.UserService.Register(newUser);
    }
  }
  