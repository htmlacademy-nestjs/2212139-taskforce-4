import { IComment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class CommentEntity implements Entity<CommentEntity>, IComment {
  public commentId: number;
  public text: string;
  public userId: string;
  public taskId: number;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(comment: IComment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: IComment) {
    this.commentId = entity.commentId;
    this.text = entity.text;
    this.userId = entity.userId;
    this.taskId = entity.taskId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public toObject(): CommentEntity {
    return { ...this };
  }
}
