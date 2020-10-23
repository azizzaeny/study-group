import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';


import { IUserModel } from 'src/providers/user/domain/entity';

import  {UserProfileDto} from 'src/providers/user/dtos/user-profile.dto';

import {IResponse, success, failure, exception} from 'src/api/rest/response/http-message';

import { findByEmail, findAll,  findById } from 'src/providers/user/domain/query';
import { deleteUser } from 'src/providers/user/domain/operation';


@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: IUserModel) { }
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
  
  async upsertInitialData(){
    let user_data = [{
      insertOne:{
	
	document:{
	  first_name:"aziz",
	  last_name:"zaeny",
	  email:"aziz@mail.com",
	  phone:"+62812809878",
	  created_at: new Date(),
	  last_updated: new Date(),
	  status: 'active',
	  validated_email: true,
	  auth:{
	    password:'$2a$10$P686ldZJBOysMYD7vRTlKOt9MPmGjw1K3iyf4PN7DN.Uj3rvgJAcW',
	    method: 'email',
	    verify_token: '',
	    reset_token: '',
	    roles: ['admin']
	  },
	}
      }
      
    },{
      insertOne:{
	document:{
	  first_name:"dodi",
	  last_name:"",
	  email:"dodi@mail.com",
	  phone:"+62812809871",
	  created_at: new Date(),
	  last_updated: new Date(),
	  status: 'pending',
	  validated_email: false,
	  auth:{
	    password:'$2a$10$P686ldZJBOysMYD7vRTlKOt9MPmGjw1K3iyf4PN7DN.Uj3rvgJAcW',
	    method: 'email',
	    verify_token: '',
	    reset_token: '',
	    roles: ['user']
	  },
	}
	
      }
    },
		     {
      insertOne:{
	document:{
	  first_name:"ovo",
	  last_name:"",
	  email:"ovo@mail.com",
	  phone:"+62819809878",
	  created_at: new Date(),
	  last_updated: new Date(),
	  status: 'active',
	  validated_email: true,
	  auth:{
	    password:'$2a$10$P686ldZJBOysMYD7vRTlKOt9MPmGjw1K3iyf4PN7DN.Uj3rvgJAcW',
	    method: 'email',
	    verify_token: '',
	    reset_token: '',
	    roles: ['user']
	  },
	}
      }}
		    ];
    
    await this.userModel.remove({});
    return await this.userModel.bulkWrite(user_data);
    
  }

  
}
