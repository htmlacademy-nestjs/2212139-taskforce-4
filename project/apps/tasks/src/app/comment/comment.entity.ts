import { Comment } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class CommentEntity implements Entity<CommentEntity>, Comment {
  public id: number;
  public text: string;
  public userId: string;
  public taskId: number;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(entity: Comment) {
    this.id = entity.id;
    this.text = entity.text;
    this.userId = entity.userId;
    this.taskId = entity.taskId;
  }

  public toObject(): CommentEntity {
    return { ...this };
  }
}
