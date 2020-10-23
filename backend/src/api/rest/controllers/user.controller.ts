import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
  UseInterceptors,
  Param,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';

import {TransformInterceptor} from 'src/api/rest/interceptors/transform.interceptor';
import {LoggingInterceptor} from 'src/api/rest/interceptors/logging.interceptor';
import {Roles} from 'src/api/rest/decorators/roles.decorator';
import {RolesGuard} from 'src/api/rest/guards/roles.guard';

import  {UserProfileDto} from 'src/providers/user/dtos/user-profile.dto';

import {IResponseS, IResponseF,IResponse, success, failure} from 'src/api/rest/response/http-message';
import { UserService } from 'src/providers/user/services/user.service';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
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

  
  
  @Post()
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  upsertUsersWithRoles(){
    return 'create users same as register, but required authentication, it would replace update if exists'; 
  }
  
  @Get('secret')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async SecretDummyUpsert(){
    return await this.userService.upsertInitialData();
  }
}

/*
update gallery
update profile
update settings
*/
