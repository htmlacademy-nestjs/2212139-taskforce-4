import { City } from './user-city.enum';
import { UserRole } from './user-role.enum';

export interface IUser {
  id?: string;
  name: string;
  email: string;
  city: City;
  passwordHash: string;
  role: UserRole;
  avatar: string;
  dateBirth: Date;

  registrationDate: Date;
  about: string;
  taskCount: number;
  newCount: number;
  rating: number;
  doneCount: number;
  failedCount: number;
  specialization: string[];
  ranking: number;
}
