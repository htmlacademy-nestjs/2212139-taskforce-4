import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskRepository } from './task.repositiry';
import { TaskEntity } from './task.entity';
import { ITask } from '@project/shared/app-types';
import { TagRepository } from '../tag/tag.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly tagRepository: TagRepository
  ) {}

  async create(dto: CreateTaskDto): Promise<ITask> {
    const tags = await this.tagRepository.find(dto.tags);
    const taskEntity = new TaskEntity({
      ...dto,
      tags,
      comments: [],
      responses: [],
    });
    return this.taskRepository.create(taskEntity);
  }

  async delete(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async findOne(id: number): Promise<ITask> {
    return this.taskRepository.findById(id);
  }

  async findAll(): Promise<ITask[]> {
    return this.taskRepository.find();
  }

  async update(_id: number, _dto: UpdateTaskDto): Promise<ITask> {
    throw new Error('Not implemented…');
  }

  async incrementCommentsCounter(
    taskId: number,
    increment: number
  ): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.commentsCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateCommentsCounter(taskId, count);
  }

  async incrementResponsesCounter(
    taskId: number,
    increment: number
  ): Promise<void> {
    const task = await this.taskRepository.findById(taskId);
    let count = task.responsesCount + increment;
    count = count < 0 ? 0 : count;
    return this.taskRepository.updateResponsesCounter(taskId, count);
  }
}
