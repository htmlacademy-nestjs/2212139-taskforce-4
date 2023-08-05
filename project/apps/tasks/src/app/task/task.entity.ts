import { Entity } from '@project/util/util-types';
import {
  ITask,
  IComment,
  IReview,
  ITag,
  IResponse,
  City,
  TaskStatus,
} from '@project/shared/app-types';

export class TaskEntity implements Entity<TaskEntity>, ITask {
  public taskId: number;
  public title: string;
  public details: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public city: City;
  public status: TaskStatus;
  public comments?: IComment[];
  public responses: IResponse[];
  public review?: IReview;
  public tags?: ITag[];
  public categoryId: number;

  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;
  public responsesCount?: number;
  public commentsCount?: number;

  constructor(task: ITask) {
    this.fillEntity(task);
  }

  public fillEntity(entity: ITask): void {
    this.taskId = entity.taskId;
    this.title = entity.title;
    this.details = entity.details;
    this.categoryId = entity.categoryId;
    this.price = entity.price;
    this.deadline = entity.deadline;
    this.image = entity.image;
    this.address = entity.address;
    this.city = entity.city;
    this.comments = [];
    this.responses = [...entity.responses];
    this.review = entity.review;
    this.tags = [...entity.tags];
    this.status = entity.status;
    this.userId = entity.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.responsesCount = entity.responsesCount;
    this.commentsCount = entity.commentsCount;
  }

  public toObject(): TaskEntity {
    return {
      ...this,
      comments: [...this.comments],
      responses: [...this.responses],
      tags: [...this.tags],
    };
  }
}
