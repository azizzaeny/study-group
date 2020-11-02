export class UserProfileDto{
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
}

export class UserAuthDto{
  password: string;
  new_password: string;
}

export class UserAvatarDto{
  pic_url: string;
}


export class UserProfileAllDto{
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  password: string;
  status: string;
  validated_email: string;
  profile_pic: string;
  roles: string;
  method: string
}
