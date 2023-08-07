import { IComment, IEntity } from '@project/shared/app-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public commentId: number;
  public text: string;
  public userId: string;
  public taskId: number;
  public createdAt: Date;

  constructor(comment: IComment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: IComment) {
    this.commentId = entity.commentId;
    this.text = entity.text;
    this.userId = entity.userId;
    this.taskId = entity.taskId;
    this.createdAt = new Date();
  }

  public toObject(): CommentEntity {
    return { ...this };
  }
}
