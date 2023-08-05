import { ICategory } from '@project/shared/app-types';
import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryRepository
  implements CRUDRepository<CategoryEntity, number, ICategory>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CategoryEntity): Promise<ICategory> {
    return this.prisma.category.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.category.delete({
      where: {
        categoryId: id,
      },
    });
  }

  public findById(id: number): Promise<ICategory | null> {
    return this.prisma.category.findFirst({
      where: {
        categoryId: id,
      },
    });
  }

  public find(): Promise<ICategory[]> {
    return this.prisma.category.findMany();
  }

  public findByName(name: string): Promise<ICategory | null> {
    return this.prisma.category.findFirst({
      where: { name },
    });
  }

  public update(categoryId: number, item: CategoryEntity): Promise<ICategory> {
    return this.prisma.category.update({
      where: {
        categoryId,
      },
      data: { ...item.toObject(), categoryId },
    });
  }
}
