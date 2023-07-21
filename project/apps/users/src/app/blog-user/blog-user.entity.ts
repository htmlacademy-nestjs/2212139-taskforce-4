import { City, IUser, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements IUser {
  public id: string;
  public email: string;
  public name: string;
  public about: string;
  public city: City;
  public dateBirth: Date;
  public avatar: string;
  public passwordHash: string;
  public role: UserRole;
  public registrationDate: Date;

  public taskCount: number;
  public newCount: number;
  public rating: number;
  public doneCount: number;
  public failedCount: number;
  public specialization: string[];
  public ranking: number;

  constructor(blogUser: IUser) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return { ...this };
  }

  public fillEntity(blogUser: IUser) {
    this.id = blogUser.id;
    this.avatar = blogUser.avatar;
    this.dateBirth = blogUser.dateBirth;
    this.email = blogUser.email;
    this.name = blogUser.name;
    this.city = blogUser.city;
    this.passwordHash = blogUser.passwordHash;
    this.role = blogUser.role;
    this.about = blogUser.about;

    this.specialization = blogUser.specialization;
    this.taskCount = blogUser.taskCount;
    this.newCount = blogUser.newCount;
    this.rating = blogUser.rating;
    this.doneCount = blogUser.doneCount;
    this.failedCount = blogUser.failedCount;
    this.ranking = blogUser.rating;
    this.registrationDate = blogUser.registrationDate;
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUNDS);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }
}
