import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  HttpCode,
  Req,
  Request,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import {TransformInterceptor} from 'src/shared/interceptors/transform.interceptor';
import {LoggingInterceptor} from 'src/shared/interceptors/logging.interceptor';
import {Roles} from 'src/shared/decorators/roles.decorator';
import {RolesGuard} from 'src/shared/guards/roles.guard';

import  {UserProfileDto} from 'src/modules/user/dtos/user-profile.dto';

import { IResponseS, IResponseF,IResponse, success, failure} from 'src/shared/response/http-message';
import { UserService } from './user.service';

@Controller('users')
//@UseGuards(AuthGuard('jwt'))
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }
  
  @Get()
  @UseGuards(RolesGuard)
  @Roles('user')
  public async getAllUsers() : Promise<IResponse<any>> {
    try{
      return await this.userService.getAllUsers();
    }catch(err){
      return failure('user.getAll.catch_generic_error');
    }
  }

  @Get('id/:id')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async getOneUserMatchedId(@Param() params): Promise<IResponse<any>>{
    try{
      return await this.userService.getOneUserMatchedId(params.id);
    }catch(err){
      return failure('user.getOne.catch_generic_error');
    }
  }

  
  @Get('email/:email')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async getOneUserByEmail(@Param() params): Promise<IResponse<any>>{
    try{
      return await this.userService.getOneUserByEmail(params.id);
    }catch(err){
      return failure('user.getOne.catch_generic_error');
    }
    
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async deleteEntityUsers(@Param() params): Promise<IResponse<any>>{
    try{
      return await this.userService.deleteEntityUsers(params.id);
    }catch(err){
      return failure('user.delete.catch_generic_error');
    }
  }

  @Put('profile')
  @UseGuards(RolesGuard)
  @Roles('user')
  async profileUpdate(userProfile: UserProfileDto){
    try{
      return await this.userService.profileUpdate(userProfile);
    }catch(err){
      return failure('user.profile.cannot_update_profile_generic_error_catch');
    }
  }

  @Get('profile')
  
  //@UseGuards(RolesGuard)
  //@Roles('user')
  
  async getProfileUser(@Req() req){
    console.log('REquesting', req);
    let user = req.user;
    try{
	return await this.userService.getProfileUser(user);
      }catch(err){
	return failure('user.profile.cannot_get_profile_generic_error_catch');
      }
  }
  
  @Post()
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  upsertUsersWithRoles(){
    return 'create users same as register, but required authentication, it would replace update if exists'; 
  }
  
  

  @Get('secret')
  // @UseGuards(RolesGuard)
  // @Roles('user_admin')
  public async SecretDummyUpsert(){
    return await this.userService.upsertSeedData();
  }
}

/*
update gallery
update profile
update settings
*/
