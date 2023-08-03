import { Category } from './category.interface.js';
import { Comment } from './comment.interface.js';
import { Review } from './review.interface.js';
import { Tag } from './tag.interface.js';
import { TaskStatus } from './task-status.enum.js';
import { City } from './user-city.enum.js';

export interface Task {
  id?: number;
  title: string;
  details: string;
  price: number;
  deadline: Date;
  image?: string;
  address: string;
  city: City;
  status: TaskStatus;

  customerId: string;
  executerId?: string;
  createdAt?: Date;
  updatedAt?: Date;

  tags: Tag[];
  comments: Comment[];
  categories: Category[];
  review?: Review;
}
