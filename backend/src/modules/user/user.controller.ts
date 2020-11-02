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
import  {UserProfileDto, UserAuthDto, UserAvatarDto, UserProfileAllDto } from 'src/modules/user/dtos/user-profile.dto';
import { IResponse, response, success, failure} from 'src/shared/response/http-message';
import { UserService } from './user.service';
import {User} from 'src/shared/decorators/user.decorator';

@Controller('users')
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async getAllUsers() : Promise<IResponse<any>>{
    return response(await this.userService.getUsers());
  }
  
  @Get('email/:email')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async getEmail(@Param() params,){
    return response(await this.userService.getUserByEmail(params.email));
  }

  @Delete('email/:email')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async deleteByEmail(@Param() params){
    try{
      return response(await this.userService.deleteUserByEmail(params.email));
    }catch(err){
      return failure('user.delete.catch_generic_error');
    }
    
  }

  @Put('')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async upsertUser(@Body() userProfileAll: UserProfileAllDto, ){
    try{
      let email = userProfileAll.email;
      return response(await this.userService.updateWholeProfile(email, userProfileAll)); 
    }catch(err){
      return failure('user.add.catch_generic_error');
    }
  }
  
  @Put('email/:email')
  @UseGuards(RolesGuard)
  @Roles('user_admin')
  public async updateUser(@Body() userProfileAll: UserProfileAllDto, @Param() params){
    try{
      return response(await this.userService.updateWholeProfile(params.email,userProfileAll)); 
    }catch(err){
      return failure('user.profile.catch_generic_error');
    }
  }

  
  @Get('profile/:email')
  @UseGuards(RolesGuard)
  @Roles('user')  
  public async getProfileUser(@Param() params, @Req() req){
    try{
      return response(await this.userService.getProfile(params.email, req));
    }catch(err){
      return failure('user.profile.cannot_get_profile_generic_error');
    }
    
  }

  

	 
  @Get('profile')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async getProfileUserRequest(@Req() req){
    try{
      let email = req.locals.user.email;
      return response(await this.userService.getProfile(email, req))
      }catch(err){
	return failure('user.profile.cannot_get_profile_generic_error');
      }
  }


  
  @Put('profile')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async updateProfileUser(@Body() userProfileDto: UserProfileDto, @Req() req){
    
    try{
      return response(await this.userService.updateProfile(userProfileDto, req));
     }catch(err){ 
       return failure('user.profile.update_genereric_error');
     }
    
  }

  @Put('set-password')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async updateProfilePassword(@Body() userAuthDto: UserAuthDto, @Req() req){
    try{
      return response(await this.userService.updatePassword(userAuthDto, req));
    }catch(err){ 
      return failure('user.profile.update_genereric_error');
    }
  }

  
  @Put('profile-picture')
  @UseGuards(RolesGuard)
  @Roles('user')
  public async updateProfilePicture(@Body() userProfileDto: UserProfileDto){
    return failure('user.profile.update_picture_generic_error');
  }

  
  @Get('secret')
  public async SecretDummyUpsert(){
    return await this.userService.upsertSeedData(); 
  }
  
}
