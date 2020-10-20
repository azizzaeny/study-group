export type AuthMethod = 'email' | 'phone';

export interface IAuth {
  username: string;
  password: string;
  resetoken: string;
  roles: string[];
  method?: AuthMethod
}
