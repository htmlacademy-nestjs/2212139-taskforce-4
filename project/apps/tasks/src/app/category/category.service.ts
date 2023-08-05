import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ICategory } from '@project/shared/app-types';
import { CategoryRepository } from './category.repository';
import { CategoryEntity } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(dto: CreateCategoryDto): Promise<ICategory> {
    const categoryEntity = new CategoryEntity(dto);
    return this.categoryRepository.create(categoryEntity);
  }

  async delete(id: number): Promise<void> {
    this.categoryRepository.destroy(id);
  }

  async findOrCreate(name: string): Promise<ICategory> {
    const existCategory = await this.categoryRepository.findByName(name);

    if (!existCategory) {
      return this.create({ name });
    }

    return existCategory;
  }

  async findOne(id: number): Promise<ICategory> {
    return this.categoryRepository.findById(id);
  }

  async findAll(): Promise<ICategory[]> {
    return this.categoryRepository.find();
  }

  async update(id: number, dto: UpdateCategoryDto): Promise<ICategory> {
    return this.categoryRepository.update(id, new CategoryEntity(dto));
  }
}
