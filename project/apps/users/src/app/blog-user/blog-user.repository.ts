import { CRUDRepository } from '@project/util/util-types';
import { Injectable } from '@nestjs/common';
import { BlogUserEntity } from './blog-user.entity';
import { IUser } from '@project/shared/app-types';
import { BlogUserModel } from './blog-user.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BlogUserRepository
  implements CRUDRepository<BlogUserEntity, string, IUser>
{
  constructor(
    @InjectModel(BlogUserModel.name)
    private readonly blogUserModel: Model<BlogUserModel>
  ) {}

  public async create(item: BlogUserEntity): Promise<IUser> {
    const newBlogUser = new this.blogUserModel(item);
    return newBlogUser.save();
  }

  public async destroy(id: string): Promise<void> {
    this.blogUserModel.deleteOne({ _id: id });
  }

  public async findById(id: string): Promise<IUser | null> {
    return this.blogUserModel.findOne({ _id: id }).exec();
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    return this.blogUserModel.findOne({ email }).exec();
  }

  public async update(id: string, item: BlogUserEntity): Promise<IUser> {
    return this.blogUserModel
      .findByIdAndUpdate(id, item.toObject(), { new: true })
      .exec();
  }
}
