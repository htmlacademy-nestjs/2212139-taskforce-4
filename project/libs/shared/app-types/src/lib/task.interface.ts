import { IComment } from './comment.interface';
import { IResponse } from './response.interface';
import { IReview } from './review.interface';
import { ITag } from './tag.interface';

export interface ITask {
  taskId?: number;
  title: string;
  details: string;
  categoryId: number;
  price?: number;
  deadline?: Date;
  image?: string;
  address?: string;
  city: string;
  status: string;
  customerId: string;
  executorId?: string;
  createdAt?: Date;
  updatedAt?: Date;
  responsesCount?: number;
  commentsCount?: number;

  tags?: ITag[];
  comments?: IComment[];
  responses?: IResponse[];
  review?: IReview;
}
