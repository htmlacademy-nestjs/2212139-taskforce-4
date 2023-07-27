import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { City, IUser, UserRole } from '@project/shared/app-types';
import dayjs from 'dayjs';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
  timestamps: true,
})
export class BlogUserModel extends Document implements IUser {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
  })
  public email: string;

  @Prop({
    required: true,
    enum: City,
    type: String,
  })
  city: City;

  @Prop({
    required: true,
  })
  public passwordHash: string;

  @Prop({
    required: true,
    type: String,
    enum: UserRole,
    default: UserRole.Customer,
  })
  public role: UserRole;

  @Prop({
    default: '',
  })
  public avatar: string;

  @Prop({
    required: true,
  })
  public dateBirth: Date;

  @Prop({
    required: true,
    default: dayjs().toDate(),
  })
  registrationDate: Date;

  @Prop({
    default: '',
  })
  about: string;

  @Prop({
    default: 0,
  })
  taskCount: number;

  @Prop({
    default: 0,
  })
  newCount: number;

  @Prop({
    default: 0,
  })
  rating: number;

  @Prop({
    default: 0,
  })
  doneCount: number;

  @Prop({
    default: 0,
  })
  failedCount: number;

  @Prop({
    default: [''],
  })
  specialization: string[];

  @Prop({
    default: 0,
  })
  ranking: number;
}

export const BlogUserSchema = SchemaFactory.createForClass(BlogUserModel);
