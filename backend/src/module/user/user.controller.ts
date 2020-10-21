import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
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

  @Get()
  async getAllUsers() {
    return await this.userService.findAll();
  }

  @Get('id/:id')
  async getUserById(@Param() params): Promise<IResponse> {
    let user = await this.userService.findById(params.id);
    return user;
  }

  @Get('email/:email')
  async getUserByEmail(@Param() params): Promise<IResponse> {
    try {
      let user = await this.userService.findByEmail(params.email);
      return new ResponseSuccess('USER.GET_SUCCESS', new UserResponseDto(user));
    } catch (error) {
      return new ResponseError('USER.ERROR_GENERIC', error);
    };
  }

  @Get('profile/:email')
  async getUserProfile(@Param() params): Promise<any> {
    return {
      profile: await this.userService.findByEmail(params.email),
      auth: await this.authService.findByEmail(params.email)
    }
  }

  // TODO: this upsert is not correct way to updating
  @Post('upsert')
  @HttpCode(HttpStatus.OK)
  async updateUser(@Body() userDto: UserDto) {
    return await this.userService.upsertByEmail(userDto);
  }

  @Put('update')
  @HttpCode(HttpStatus.OK)
  async putUpdateUser() { }


  @Post('delete/:email')
  @HttpCode(HttpStatus.OK)
  async postDeleteByEmail(@Param() params): Promise<IResponse> {
    let user = await this.userService.deleteByEmail(params.email);
    let auth = await this.authService.deleteByEmail(params.email);
    if (user && auth) {
      return new ResponseSuccess('USER.REMOVED');
    } else {
      return new ResponseSuccess('OK');
    }
  }

  @Post('create')
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
