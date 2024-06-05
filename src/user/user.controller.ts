import { Controller, Body, Post, Res, Get, Patch, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateMemberDto, MemberDto } from './dto/user.request';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() input: MemberDto, @Res() res: Response) {
    const user = await this.userService.singUp(input);
    return res.status(200).json({ message: `SignUp Successfull`, user});
  }

  @Get()
  async getUser() {
    const users = await this.userService.getMembers();
    return users;
  }

  @Put('deactivate/:id')
  async deactivateUser(@Param('id') id: string) {
    return await this.userService.deactivateMember(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() update: UpdateMemberDto, @Res() res: Response) {
    const user = await this.userService.updateMember(id, update);
    return res.status(200).json({ message: `User Updated Successfully`, user});
  }
}
