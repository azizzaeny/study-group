import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import { IResponse, ResponseSuccess, ResponseError } from './../../common/dto/response.dto';

import { UserDto, UserResponseDto, user_response, IUserRegistered, create_user } from './../../domain/user';
import { UserService } from './user.service';
import { AuthService } from './../auth/auth.service';

@Controller('user')
export class UserController {

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Get(':email')
  async getUserByEmail(@Param() params): Promise<IResponse> {
    try {
      let user = await this.userService.findByEmail(params.email);
      return new ResponseSuccess('USER.GET_SUCCESS', new UserResponseDto(user));
    } catch (error) {
      return new ResponseError('USER.ERROR_GENERIC', error);
    };
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() userDto: UserDto): Promise<IResponse> {
    try {
      let created = await this.userService.registerUser(userDto);
      let sentEmail = await this.authService.sentEmailVerification('');
      if (created && sentEmail) {
        return new ResponseSuccess('USER.REGISTRATION_SUCCESS');
      } else {
        return new ResponseError('USER.REGISTRATION_ERROR_EMAIL_NOT_SENT');
      }

    } catch (error) {
      return new ResponseError('USER.REGISTRATION.ERROR_GENERIC', error);
    }

  }
}
