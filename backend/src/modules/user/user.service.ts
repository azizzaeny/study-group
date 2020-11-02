import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { IUserModel,findByEmail, findAll,
	 updateProfile, updatePassword, upsertUser,
	 findById, deleteUser, deleteUserByEmail} from './user.model';
import  { UserProfileDto, UserAuthDto, UserAvatarDto,
	  UserProfileAllDto
	} from 'src/modules/user/dtos/user-profile.dto'; 
import {IResponse, success, failure, exception} from 'src/shared/response/http-message';

import {create_user_seeds, user_lists} from './user.seed';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: IUserModel) { }
  query() { }
  operations() { }

  notFound(){
    return {
      error: 'user.not_found',
      status: HttpStatus.NOT_FOUND
    }
  }
  async getUsers(){
    let user = await findAll(this.userModel);
    if(!user){
      return this.notFound();
    }else{
      return {
	msg:'user.found.success',
	value: user
      }
    }
  }

  async getUserByEmail(email){
    let user = await findByEmail(this.userModel, email);
    if(!user){
      return {
	error: 'user.not_found',
	status: HttpStatus.NOT_FOUND
      }
    }
    return {
      msg: 'user.found.success',
      value: user
    }
  }

  
  async deleteUserByEmail(email) : Promise<any>{
    let user = await deleteUserByEmail(this.userModel, email);
   
    if(!user){
      return {
	error: 'cannot delete user, user not found',
	status: HttpStatus.NOT_FOUND
      }
    }
    
    return {
      msg: 'ok',
      value: { email: user.email}
    }
 
  }
  
  async getProfile(email, req) :Promise<any>{
    console.log(req.locals);
    let locals = req.locals.user.email || '';
    
    if(locals !== email){
      return {
	error: 'user.profile.Unauthorized_request_profile',
	status: HttpStatus.FORBIDDEN
      }
    }
    let user = await findByEmail(this.userModel, locals)

    if(!user){
      return {
	error: 'user.profile.not_found',
	status: HttpStatus.FORBIDDEN
      }
    }
    return {
      msg: 'user.profile.success',
      value: Object.assign(user, {auth:{}})
    }
  }

  async updateWholeProfile(email, profile){
    let required = (profile.first_name && profile.last_name, profile.email && profile.password && profile.status && profile.validated_email && profile.profile_pic, profile.roles && profile.method);
    
    if(!required){
      return {
	error: 'user.update.missing_required_fields',
	status: HttpStatus.FORBIDDEN
      }
    }

    let user = await upsertUser(this.userModel, profile);

    if(!user){
      return {
	error: 'user.profile.cannot_update_profile',
	status: HttpStatus.FORBIDDEN
      }
    }
    return {
      msg: 'user.profile.is_updated',
      value: user.email
    }
  }

  async updateProfile(userProfileDto: UserProfileDto, req){
    let locals = req.locals.user.email || '';
    let dto = userProfileDto;
    let required = (dto.first_name && dto.last_name && dto.phone);
    if (!required){
      return {
	error:"user.profile.unchanged_profile",
	status: HttpStatus.FORBIDDEN
      }
    }
    
    let user = await updateProfile(this.userModel, locals, {
      first_name: dto.first_name,
      last_name: dto.last_name,
      phone: dto.phone
    });
    
    if(!user){
      return {
	error: 'user.profile.cannot_update_profile',
	status: HttpStatus.FORBIDDEN
      }
    }
    return {
      msg: 'user.profile.upserted',
      value: {
	email :  user.email
      }
    }
  }

  async updatePassword(userAuthDto: UserAuthDto, req){
    let locals = req.locals.user.email || '';
    let dto = userAuthDto;
    let required = (dto.password && dto.new_password);
    let new_password = dto.new_password;
    
    if(!required){
      return {
	error: 'user.profile.require_mandatory_field_to_update_pass',
	status: HttpStatus.FORBIDDEN
      }
    }

    let user = await updatePassword(this.userModel, locals, new_password);
    
    if (!user){
      return {
	error: 'user.profile.cannot_update_password',
	status: HttpStatus.FORBIDDEN
      }
    }
    return {
      msg: "user.profile.updated_password",
      value: {email: user.email}
    }
  }
  
  // async getUserByEmail(email){
  //   let user = await findByEmail(this.userModel, email);
  //   return user
  // }
  // async getAllUsers(): Promise<IResponse<any>>{
  //   let user = await findAll(this.userModel);
  //   return success('get all users list, required roles', user);
  // }
  
  // async getOneUserMatchedId(id: string): Promise<IResponse<any>>{
  //   let user = await findById(this.userModel, id);
  //   return success('get one users matched id', user);
  // }
  
  // async getOneUserByEmail(email: string) : Promise<any>{
  //   let user = await findByEmail(this.userModel, email);
  //   if(!user){
  //     return {
  // 	error: 'user.notfound',
  // 	status: HttpStatus.NOT_FOUND
  //     }
  //   }else{
  //     return {
  // 	msg: 'user.found',
  // 	value: user
  //     }
  //   }
  
  // }

  // async upsertUsersWithRoles(){
  //   return 'create users same as register, but required authentication, it would replace update if exists'; 
  // }
  // async profileUpdate(userProfile: UserProfileDto){
  
  // }

  async upsertSeedData(){
    // reset state,
    await this.userModel.remove({});
    let status = await this.userModel.bulkWrite(create_user_seeds(user_lists));
    let users = await findAll(this.userModel);
    return success('upsert seed data', users);
  }

  // async getProfileUser(email){
  //   let users = await this.userModel.findOne({email : email});
  //   let new_users = Object.assign(users, {
  //     auth: {}
  //   });
  //   if(Boolean(users)){
  //     return success('profile.user.success', new_users);
  //   }
  //   return failure('profile.user.failure', { email });
  // }
  
  // async whoMe(email){
  //   let user = await this.userModel.findOne({ email: email });
  //   return success('user.whome', user);
  // }
}

