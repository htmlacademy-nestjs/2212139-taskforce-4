import { ICategory } from '@project/shared/app-types';
import { Entity } from '@project/util/util-types';

export class CategoryEntity implements Entity<CategoryEntity>, ICategory {
  public categoryId: number;
  public name: string;

  constructor(category: ICategory) {
    this.fillEntity(category);
  }

  public fillEntity(entity: ICategory) {
    this.name = entity.name;
    this.categoryId = entity.categoryId;
  }

  public toObject(): CategoryEntity {
    return { ...this };
  }
}
