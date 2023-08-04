import { Entity } from '@project/util/util-types';
import {
  Task,
  Comment,
  Review,
  Tag,
  City,
  TaskStatus,
  Category,
} from '@project/shared/app-types';

export class TaskEntity implements Entity<TaskEntity>, Task {
  public id: number;
  public title: string;
  public details: string;
  public categories: Category[];
  public price: number;
  public deadline: Date;
  public image: string;
  public address: string;
  public city: City;
  public comments: Comment[];
  public review: Review;
  public tags: Tag[];
  public status: TaskStatus;

  public customerId: string;
  public executerId: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(post: Task) {
    this.fillEntity(post);
  }

  public fillEntity(entity: Task): void {
    this.id = entity.id;
    this.title = entity.title;
    this.details = entity.details;
    this.categories = [...entity.categories];
    this.price = entity.price;
    this.deadline = entity.deadline;
    this.image = entity.image;
    this.address = entity.address;
    this.city = entity.city;
    this.comments = [];
    this.review = entity.review;
    this.tags = [];
    this.status = entity.status;
    this.customerId = entity.customerId;
    this.executerId = entity.executerId;
  }

  public toObject(): TaskEntity {
    return {
      ...this,
      comments: [...this.comments],
      tags: [...this.tags],
      categories: [...this.categories],
    };
  }
}
