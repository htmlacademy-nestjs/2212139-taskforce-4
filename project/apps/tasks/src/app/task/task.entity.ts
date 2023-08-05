import { Entity } from '@project/util/util-types';
import {
  Task,
  Comment,
  Review,
  Tag,
  Category,
} from '@project/shared/app-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public taskId: number;
  public title: string;
  public details: string;
  public price?: number;
  public deadline?: Date;
  public image?: string;
  public address?: string;
  public city: string;
  public status: string;
  public comments?: Comment[];
  public review?: Review;
  public tags?: Tag[];
  public category: Category;

  public userId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(task: Task) {
    this.fillEntity(task);
  }

  public fillEntity(entity: Task): void {
    this.taskId = entity.taskId;
    this.title = entity.title;
    this.details = entity.details;
    this.category = entity.category;
    this.price = entity.price;
    this.deadline = entity.deadline;
    this.image = entity.image;
    this.address = entity.address;
    this.city = entity.city;
    this.comments = [];
    this.review = entity.review;
    this.tags = [...entity.tags];
    this.status = entity.status;
    this.userId = entity.userId;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public toObject(): TaskEntity {
    return {
      ...this,
      category: this.category,
      comments: [...this.comments],
      tags: [...this.tags],
    };
  }
}
