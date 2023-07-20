import { UserRole } from './user-role.enum';

export interface IUser {
  id?: string;
  email: string;
  firstname: string;
  lastname: string;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
}
