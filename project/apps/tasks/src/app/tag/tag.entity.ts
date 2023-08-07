import { IEntity, ITag } from '@project/shared/app-types';

export class TagEntity implements IEntity<TagEntity>, ITag {
  public tagId: number;
  public name: string;
  public createdAt?: Date;

  constructor(tag: ITag) {
    this.fillEntity(tag);
  }

  public fillEntity(entity: ITag) {
    this.tagId = entity.tagId;
    this.name = entity.name;
    this.createdAt = new Date();
  }

  public toObject(): TagEntity {
    return { ...this };
  }
}
