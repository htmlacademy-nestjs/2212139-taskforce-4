import { Review } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class ReviewEntity implements Entity<ReviewEntity>, Review {
  public id: number;
  public review: string;
  public evaluation: number;
  public taskId: number;
  public createdAt?: Date;

  constructor(review: Review) {
    this.fillEntity(review);
  }

  public fillEntity(entity: Review) {
    this.id = entity.id;
    this.review = entity.review;
    this.evaluation = entity.evaluation;
    this.taskId = entity.taskId;
  }

  public toObject(): ReviewEntity {
    return { ...this };
  }
}
