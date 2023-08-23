import { UserRole } from './user-role.enum';

export interface ITokenPayload {
  sub: string;
  name: string;
  email: string;
  role: UserRole;
}
