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
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const categories = await this.categoryRepository.find(dto.categories);
    const taskEntity = new TaskEntity({ ...dto, categories, comments: [] });
    return this.taskRepository.create(taskEntity);
  }

  async deletePost(id: number): Promise<void> {
    this.blogPostRepository.destroy(id);
  }

  async getPost(id: number): Promise<Post> {
    return this.blogPostRepository.findById(id);
  }

  async getPosts(): Promise<Post[]> {
    return this.blogPostRepository.find();
  }

  async updatePost(_id: number, _dto: UpdatePostDto): Promise<Post> {
    throw new Error('Not implemented…');
  }
}
