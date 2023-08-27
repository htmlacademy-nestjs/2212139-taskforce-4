import { IEntity, IReview } from '@project/shared/app-types';

export class ReviewEntity implements IEntity<ReviewEntity>, IReview {
  public reviewId: number;
  public review: string;
  public evaluation: number;
  public taskId: number;
  public userId: string;
  public executorId: string;
  public createdAt: Date;

  constructor(review: IReview) {
    this.fillEntity(review);
  }

  public fillEntity(entity: IReview) {
    this.reviewId = entity.reviewId;
    this.review = entity.review;
    this.evaluation = entity.evaluation;
    this.taskId = entity.taskId;
    this.customerId = entity.customerId;
    this.executorId = entity.executorId;
    this.createdAt = new Date();
  }

  public toObject(): ReviewEntity {
    return { ...this };
  }
}
