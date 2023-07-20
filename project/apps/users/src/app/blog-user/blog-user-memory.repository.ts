import { CRUDRepository } from '@project/util/util-types';
import { IUser } from '@project/shared/app-types';
import { BlogUserEntity } from './blog-user.entity';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserMemoryRepository
  implements CRUDRepository<BlogUserEntity, string, IUser>
{
  private repository: Record<string, IUser> = {};

  public async create(item: BlogUserEntity): Promise<IUser> {
    const entry = { ...item.toObject(), _id: randomUUID() };
    this.repository[entry._id] = entry;

    return entry;
  }

  public async findById(id: string): Promise<IUser> {
    if (this.repository[id]) {
      return { ...this.repository[id] };
    }

    return null;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const existUser = Object.values(this.repository).find(
      (userItem) => userItem.email === email
    );

    if (existUser) {
      return { ...existUser };
    }

    return null;
  }

  public async destroy(id: string): Promise<void> {
    delete this.repository[id];
  }

  public async update(id: string, item: BlogUserEntity): Promise<IUser> {
    this.repository[id] = { ...item.toObject(), id };
    return this.findById(id);
  }
}
