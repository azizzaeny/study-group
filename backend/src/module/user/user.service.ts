
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';

import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { IUserDocument } from './user.interface';
import { IAuthDocument } from './../auth/auth.interface';

import {
  saltRounds,
  is_valid_email,
  create_auth
} from './../../domain/auth';

import {
  UserDto,
  create_user,
  register_user,
  IUserRegistered,
  IUserProfile,
  IUserAuth
} from './../../domain/user';


export async function generatePassword(password: string, rounds: number) {
  return bcrypt.hash(password, rounds);
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
    @InjectModel('Auth') private readonly authModel: Model<IAuthDocument>
  ) { }

  async findByEmail(email: string): Promise<IAuthDocument> {
    return (await this.authModel.findOne({ email: email }).exec())
  }

  async registerUser(user: UserDto) {

    if (is_valid_email(user.email) && user.password) {
      let user_exists = await this.findByEmail(user.email);
      if (!user_exists) {
        let new_password = await generatePassword(user.password, saltRounds);
        let user_profile: IUserProfile = create_user(user, {});
        let auth_meta: IUserAuth = create_auth(user, { password: new_password });
        let created_user: IUserRegistered = register_user(user_profile, auth_meta);

        // console.log(created_user);

        let new_user = new this.userModel(created_user.profile);
        let new_auth = new this.authModel(created_user.auth);

        await new_user.save();
        await new_auth.save();

        return created_user;

      } else {
        if (user_exists.valid_email) {
          throw new HttpException('USER.REGISTRATION_ALREADY_EXISTS', HttpStatus.FORBIDDEN);
        } else {
          throw new HttpException('USER.REGISTRATION_COMPLETE_REGISTRATION_EMAIL', HttpStatus.FORBIDDEN);
        }
      }
    } else {
      throw new HttpException('USER.REGISTRATION_MISSING_REQUIRED_FIELDS', HttpStatus.FORBIDDEN);

    }


  }
}
