import { IsString, IsInt } from 'class-validator';

export class LoginDto {
  @IsString()
  readonly email: string;
  @IsString()
  readonly password: string;
}
