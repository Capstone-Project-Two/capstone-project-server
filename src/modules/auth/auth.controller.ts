import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Res, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminLoginDto } from './dto/admin-login.dto';
import { Request, Response } from 'express';
import { GetCurrentUserId, Public } from 'src/common/decorator';
// import { UpdateAuthDto } from './dto/update-auth.dto';

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

  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.authService.findOne(id);
  // }

  // @Patch(':id')
  // update(@Param('id', new ParseUUIDPipe()) id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id', new ParseUUIDPipe()) id: string) {
  //   return this.authService.remove(id);
  // }
}
