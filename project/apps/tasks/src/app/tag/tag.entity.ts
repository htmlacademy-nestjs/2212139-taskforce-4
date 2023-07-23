import { Tag } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class TagEntity implements Entity<TagEntity>, Tag {
  public id: number;
  public name: string;
  public taskId: number;
  public createdAt?: Date;

  constructor(tag: Tag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: Tag) {
    this.id = entity.id;
    this.name = entity.name;
    this.taskId = entity.taskId;
  }

  public toObject(): TagEntity {
    return { ...this };
  }
}
