import { City } from './user-city.enum';
import { UserRole } from './user-role.enum';

export interface IUser {
  id?: string;
  email: string;
  name: string;
  about: string;
  city: City;
  dateBirth: Date;
  avatar: string;
  passwordHash: string;
  role: UserRole;
  registrationDate: Date;

  taskCount: number;
  newCount: number;
  rating: number;
  doneCount: number;
  failedCount: number;
  specialization: string[];
  ranking: number;
}
