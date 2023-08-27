export interface IReview {
  reviewId?: number;
  review: string;
  evaluation: number;
  taskId: number;
  customerId: string;
  executorId: string;
  createdAt?: Date;
}
