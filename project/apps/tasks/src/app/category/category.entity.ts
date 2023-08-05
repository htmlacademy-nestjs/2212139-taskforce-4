import { Category } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class CategoryEntity implements Entity<CategoryEntity>, Category {
  public id: number;
  public name: string;

  constructor(category: Category) {
    this.fillEntity(category);
  }

  public fillEntity(entity: Category) {
    this.name = entity.name;
    this.id = entity.id;
  }

  public toObject(): CategoryEntity {
    return { ...this };
  }
}
