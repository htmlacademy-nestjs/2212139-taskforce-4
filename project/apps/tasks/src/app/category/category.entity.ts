import { ICategory, IEntity } from '@project/shared/app-types';

export class CategoryEntity implements IEntity<CategoryEntity>, ICategory {
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
