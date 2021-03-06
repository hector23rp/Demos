import { AuthService } from "./services/auth.service";

export type FormProps = {
  authService: AuthService;
  hasConfirmPassword?: Boolean;
}

export enum ValidationStatus {
  'EMPTY_PASSWORD' = 'You must specify a password',
  'EMPTY_USERNAME' = 'You must specify a username',
  'PASSWORD_NOT_EQUAL' = 'The password must be equal'
};