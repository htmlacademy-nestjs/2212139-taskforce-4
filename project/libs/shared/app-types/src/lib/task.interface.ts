import { Comment } from './comment.interface.js';
import { Review } from './review.interface.js';
import { Tag } from './tag.interface.js';
import { City } from './user-city.enum.js';

export interface Task {
  id?: number;
  title: string;
  details: string;
  categoryId: number;
  price: number;
  deadline: Date;
  image?: string;
  address: string;
  tags: Tag[];
  city: City;
  comments: Comment[];
  review?: Review;

  customerId: string;
  createdAt?: Date;
  updatedAt?: Date;
  status: string;
  executerId?: string;
}
