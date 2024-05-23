import { Controller, Body, Post, Res, Get, Patch, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from './dto/user.request';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() input: UserDto, @Res() res: Response) {
    const user = await this.userService.singUp(input);
    return res.status(200).json({ message: `SignUp Successfull`, user});
  }

  @Get()
  async getUser() {
    const users = await this.userService.getUsers();
    return users;
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() update: UpdateUserDto, @Res() res: Response) {
    const user = await this.userService.updateUser(id, update);
    return res.status(200).json({ message: `User Updated Successfully`, user});
  }
}
