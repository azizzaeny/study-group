import { IAuth } from './auth';

export enum UserStatus {
  PENDING,
  ACTIVE
}

export interface IProfilePic {
  url: string;
  photo: string;
  tags: Array<string>;
  created_at: Date;
}

export interface IUser {
  full_name: string;
  phone: string;
  email: string;
  status: string;
  created_at: Date;
  last_updated?: Date;
  img_profile?: IProfilePic
}

export interface IUserProfile { profile: IUser }

export interface IUserAuth { auth: IAuth }

export interface IUserRegistered {
  profile: IUser,
  auth: IAuth,
  img_profile?: IProfilePic
}

export class UserDto {
  readonly full_name: string;
  readonly email: string;
  readonly phone: string;
  readonly password: string;
}


export const user_schema = () => {
  return {
    full_name: String,
    phone: { type: String, default: '' },
    email: String,
    status: { type: String, default: 'PENDING' },
    created_at: { type: Date, default: Date.now },
    last_updated: Date,
    img_profile: {}
  }
}


export function create_user(user: UserDto, options?: any)
  : IUserProfile {
  return {
    profile: {
      full_name: user.full_name || '',
      phone: user.phone || '',
      email: user.email,
      status: options.status || 'PENDING',
      created_at: options.created_at || new Date(),
      img_profile: options.img_profile || {}
    }
  }

}


export function register_user(profile: any, auth: any, img_profile?: any | {})
  : IUserRegistered {
  return Object.assign({}, profile, auth, img_profile);
}
