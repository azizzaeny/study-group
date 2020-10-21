import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from './../user/user.interface';
import { IAuthDocument } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUserDocument>,
    @InjectModel('Auth') private readonly authModel: Model<IAuthDocument>) { }

  async sentEmailVerification(email: string): Promise<boolean> {
    return true;
  }

  async findAll(): Promise<any> {
    return await this.authModel.find({}).exec();
  }

  async findByEmail(email: string): Promise<any> {
    return await this.authModel.findOne({ email: email }).exec();
  }

  async deleteByEmail(email: any): Promise<any> {
    return await this.authModel.findOneAndDelete({ email: email });
  }

  // TODO: create proper update
  async upsertByEmail(auth: any): Promise<any> {
    return await this.authModel.findOneAndUpdate({ email: auth.email }, auth, { new: true, upsert: true });
  }



}
