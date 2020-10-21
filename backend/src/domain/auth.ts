import { UserDto, IUserAuth, IUserRegistered } from './user';

export type AuthMethod = 'email' | 'phone';

export interface IAuth {
  email: string;
  password: string;
  resetoken: string;
  roles: string[];
  method?: AuthMethod;
  valid_email?: boolean;
  last_updated?: Date;
}

export const auth_schema = () => ({
  email: String,
  password: String,
  resetoken: { type: String, default: '' },
  roles: [Array],
  method: { type: String, default: 'email' },
  valid_email: { type: Boolean, default: false },
  last_updated: Date
});


export function create_auth(auth: UserDto, options?: any)
  : IUserAuth {
  return {
    auth: {
      email: auth.email,
      password: auth.password,
      resetoken: options.token || '',
      roles: options.roles || ['member'],
      method: options.method || 'email',
      valid_email: options.valid_email || false,
      last_updated: new Date()
    }
  }
}

export function register_user(profile: any, auth: any, img_profile?: any | {})
  : IUserRegistered {
  return Object.assign({}, profile, auth, img_profile);
}

export const saltRounds = 10;

export function is_valid_email(email: string)
  : boolean {
  if (email) {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(email);
  } else {
    return false;
  }
}
