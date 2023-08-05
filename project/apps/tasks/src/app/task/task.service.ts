import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repositiry';
import { CategoryRepository } from '../category/category.repository';
import { TaskEntity } from './task.entity';
import { Task } from '@project/shared/app-types';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly categoryRepository: CategoryRepository,
    private readonly tagRepository: TagsRepository
  ) {}

  async create(dto: CreateTaskDto): Promise<Task> {
    const categories = await this.categoryRepository.find(dto.categories);
    const tags = await this.tagRepository.find(dto.tags);
    const taskEntity = new TaskEntity({
      ...dto,
      categories,
      tags,
      comments: [],
    });
    return this.taskRepository.create(taskEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async findOne(id: number): Promise<Task> {
    return this.taskRepository.findById(id);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async update(_id: number, _dto: UpdateTaskDto): Promise<Task> {
    throw new Error('Not implemented…');
  }
}
