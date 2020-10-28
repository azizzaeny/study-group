import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { IUserModel,findByEmail, findAll,  findById, deleteUser} from './user.model';
import  { UserProfileDto } from 'src/modules/user/dtos/user-profile.dto';
import {IResponse, success, failure, exception} from 'src/shared/response/http-message';

import {create_user_seeds, user_lists} from './user.seed';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: IUserModel) { }
  query() { }
  operations() { }
  
  async getAllUsers(): Promise<IResponse<any>>{
    let user = await findAll(this.userModel);
    return success('get all users list, required roles', user);
  }
  
  async getOneUserMatchedId(id: string): Promise<IResponse<any>>{
    let user = await findById(this.userModel, id);
    return success('get one users matched id', user);
  }
  
  async getOneUserByEmail(email: string) : Promise<IResponse<any>>{
    let user = await findByEmail(this.userModel, email);
    return success('return user given email', user);
  }

  async upsertUsersWithRoles(){
    return 'create users same as register, but required authentication, it would replace update if exists'; 
  }
  async profileUpdate(userProfile: UserProfileDto){
    
  }
  async deleteEntityUsers(id) : Promise<IResponse<any>>{
    let user = await deleteUser(this.userModel, id);
    return success('delete entity users',user);
  }

  async upsertSeedData(){
    // reset state,
    await this.userModel.remove({});
    let status = await this.userModel.bulkWrite(create_user_seeds(user_lists));
    let users = await findAll(this.userModel);
    return success('upsert seed data', users)
    
  }
  
}
