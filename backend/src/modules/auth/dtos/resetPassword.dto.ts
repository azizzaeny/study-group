export class ResetPasswordDto {  
  readonly new_password: string;
  readonly confirm_password: string;
  readonly token: string;
  readonly email: string;
}
