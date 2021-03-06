import { AuthService } from "./services/auth.service";

export type FormProps = {
  authService: AuthService;
  hasConfirmPassword?: Boolean;
} 