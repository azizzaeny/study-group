import Mongoose, { Document, Model, Schema, model } from "mongoose";

export type IUserStatus = 'pending' | 'active';
export type IUserMethod = 'email'   | 'phone';
export type IUserRoles  = 'user'    | 'admin';
  
export interface IUserAuth{
  password: string;
  method: IUserMethod;
  roles: IUserRoles[];
  verify_token: string|any;
  reset_token: string;
}

export interface IUserProfilePic {
  url: string;
  file_blob: string;
};

export interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  validated_email: boolean;
  last_updated: Date;
  created_at: Date;
  status: IUserStatus;
  auth: IUserAuth | any;
  profile_pic: IUserProfilePic;
}

export interface IUserDocument extends IUser, Document{};
export interface IUserModel extends Model<IUserDocument>{};

export const UserSchema: Schema =new Schema({
  first_name: String,
  last_name: String,
  email: String,
  phone: Number,
  last_updated: Date,
  created_at: Date,
  status: String,
  validated_email: Boolean,
  auth: {
    password: String,
    method: String,
    roles: Array,
    verify_token: String,
    reset_token: String
  }
});

// export const UserModel = model<IUserDocument>('user',userSchema) as IUserModel;

