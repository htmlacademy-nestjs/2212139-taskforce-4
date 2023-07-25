import { CRUDRepository } from '@project/util/util-types';
import { IUser } from '@project/shared/app-types';
import { BlogUserEntity } from './blog-user.entity';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogUserMemoryRepository
  implements CRUDRepository<BlogUserEntity, string, IUser>
{
  private repository: Map<string, IUser> = new Map();

  public async create(item: BlogUserEntity): Promise<IUser> {
    const entry = { ...item.toObject(), id: randomUUID() };
    this.repository.set(entry.id, entry);

    return entry;
  }

  public async findById(id: string): Promise<IUser> {
    if (this.repository.get(id)) {
      return { ...this.repository.get(id) };
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
    this.repository.delete(id);
  }

  public async update(id: string, item: BlogUserEntity): Promise<IUser> {
    this.repository.set(id, { ...item.toObject(), id });
    return this.findById(id);
  }
}
