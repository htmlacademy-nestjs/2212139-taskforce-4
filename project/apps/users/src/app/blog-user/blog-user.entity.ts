import { IUser, UserRole } from '@project/shared/app-types';
import { compare, genSalt, hash } from 'bcrypt';
import { SALT_ROUNDS } from './blog-user.constant';

export class BlogUserEntity implements IUser {
  public id: string;
  public avatar: string;
  public dateBirth: Date;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public role: UserRole;

  constructor(blogUser: IUser) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {
      id: this.id,
      email: this.email,
      firstname: this.firstname,
      lastname: this.lastname,
      dateBirth: this.dateBirth,
      avatar: this.avatar,
      passwordHash: this.passwordHash,
      role: this.role,
    };
  }

  public fillEntity(blogUser: IUser) {
    this.id = blogUser.id;
    this.avatar = blogUser.avatar;
    this.dateBirth = blogUser.dateBirth;
    this.email = blogUser.email;
    this.firstname = blogUser.firstname;
    this.lastname = blogUser.lastname;
    this.passwordHash = blogUser.passwordHash;
    this.role = blogUser.role;
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
