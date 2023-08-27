import {
  ITask,
  IComment,
  IReview,
  ITag,
  IResponse,
  IEntity,
} from '@project/shared/app-types';
import dayjs from 'dayjs';

const DEFAULT_DEADLINE_DAY = 3;

export class TaskEntity implements IEntity<TaskEntity>, ITask {
  public taskId: number;
  public title: string;
  public details: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public city: string;
  public status: string;
  public comments?: IComment[];
  public responses: IResponse[];
  public tags?: ITag[];
  public categoryId: number;

  public userId: string;
  public executorId: string;
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
    this.deadline = entity.deadline
      ? dayjs(entity.deadline).toDate()
      : dayjs().add(DEFAULT_DEADLINE_DAY, 'day').toDate();
    this.image = entity.image;
    this.address = entity.address;
    this.city = entity.city;
    this.comments = [];
    this.responses = [];
    this.tags = [...entity.tags];
    this.status = entity.status ? entity.status : 'new';
    this.userId = entity.userId;
    this.executorId = entity.executorId;
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
