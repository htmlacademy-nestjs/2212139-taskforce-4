export interface IReview {
  reviewId?: number;
  review: string;
  evaluation: number;
  taskId: number;
  userId: string;
  executorId: string;
  createdAt?: Date;
}
