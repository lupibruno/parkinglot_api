import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/set-metadata.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger/dist';
  
  @Controller('auth')
  @ApiTags('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    @ApiOperation({ summary: 'POST login admin' })
    @ApiBody({ required: true, type:Post })
    signIn(@Body() signInDto: Record<string, any>) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @Get('profile')
    @ApiOperation({ summary: 'GET admin profile' })
    @ApiBearerAuth()
    getProfile(@Request() req) {
      return req.user;
    }
  }