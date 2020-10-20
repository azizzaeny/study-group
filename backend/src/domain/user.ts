export enum UserStatus {
  PENDING,
  ACTIVE
}
export interface IImgProfile {
  url: string;
  photo: string;
  tags: Array<string>;
  created_at: Date;
}

export interface IUser {
  full_name: string;
  phone: string;
  email: string;
  is_valid_email?: boolean;
  status: UserStatus;
  created_at: Date;
  last_updated?: Date;
  img_profile?: IImgProfile
}


export function user_schema() {
  return {
    full_name: String,
    phone: String,
    email: String,
    is_valid_email: { type: Boolean, default: false },
    status: String,
    created_at: { type: Date, default: Date.now },
    last_updated: Date,
    img_profile: {}
  }
}

export function user_feature(schema: any) {
  return [{ name: 'User', schema: schema }];
}
