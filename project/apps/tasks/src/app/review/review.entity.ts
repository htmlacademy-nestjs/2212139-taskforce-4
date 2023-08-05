import { IReview } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class ReviewEntity implements Entity<ReviewEntity>, IReview {
  public reviewId: number;
  public review: string;
  public evaluation: number;
  public taskId: number;
  public userId: string;
  public createdAt: Date;

  constructor(review: IReview) {
    this.fillEntity(review);
  }

  public fillEntity(entity: IReview) {
    this.reviewId = entity.reviewId;
    this.review = entity.review;
    this.evaluation = entity.evaluation;
    this.taskId = entity.taskId;
    this.userId = entity.userId;
    this.createdAt = new Date();
  }

  public toObject(): ReviewEntity {
    return { ...this };
  }
}
