import { Injectable, HttpException, HttpStatus, HttpService } from '@nestjs/common';
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose';
import { IUserDocument } from './../user/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<IUserDocument>) { }

  async generatePassword(pass: string, rounds: number) {
    return await bcrypt.hash(pass, rounds);
  }

  async sentEmailVerification(email): Promise<boolean> {
    return true;
  }

}
