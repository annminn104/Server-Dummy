import { Controller, Get, Post, Body, Req, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthDto } from './dto/auth.dto'
import { Request } from 'express'
import { AccessTokenGuard } from 'src/core/guards/accessToken.guard'
import { RefreshTokenGuard } from 'src/core/guards/refreshToken.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }

  @Post('login')
  login(@Body() data: AuthDto) {
    return this.authService.login(data)
  }

  @UseGuards(AccessTokenGuard)
  @Get('logout')
  logout(@Req() req: Request) {
    this.authService.logout(req.user['sub'])
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub']
    const refreshToken = req.user['refreshToken']
    return this.authService.refreshTokens(userId, refreshToken)
  }
}
