import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Request, Response } from 'express';
import { GetCurrentUserId, Public } from 'src/common/decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  login(@Body() loginDto: AdminLoginDto, @Res({ passthrough: true }) response: Response) {
    return this.authService.login(loginDto, response);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() id: string, @Req() request: Request, @Res({ passthrough: true }) response: Response) {
    return this.authService.logout(id, request, response);
  }
}
