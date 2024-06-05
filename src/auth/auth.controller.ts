import { Body, Controller, Post, UseGuards, Res, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signin: AuthDto, @Res() res: Response) {
    const user = await this.authService.signIn(signin);
    return res.status(200).json({ message: `Login Successfull, Welcome ${signin.email}`, user});
  }

  @Post('logout')
  async logout(@Req() _req, @Res({ passthrough: true }) res: Response) {
    res.status(200).json({ message: 'User logged out' });
  }
}
