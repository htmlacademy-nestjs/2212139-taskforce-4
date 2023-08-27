import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import { IResponse, ITask, TaskStatus } from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { TaskQuery } from './task.query';

const TAGS_MAX_COUNT = 5;

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService
  ) {}

  async create(dto: CreateTaskDto): Promise<ITask> {
    const category = await this.categoryService.findOrCreate(dto.category);
    const tagsArray = Array.from(new Set(dto.tags)).slice(0, TAGS_MAX_COUNT);
    const tags = await this.tagService.findOrCreateMany(tagsArray);
    const taskEntity = new TaskEntity({
      ...dto,
      categoryId: category.categoryId,
      tags,
      comments: [],
      responses: [],
    });

    return this.taskRepository.create(taskEntity);
  }

  async remove(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async findOne(id: number): Promise<ITask> {
    return this.taskRepository.findById(id);
  }

  async findAll(query: TaskQuery): Promise<ITask[]> {
    return this.taskRepository.find(query);
  }

  async updateTaskStatus(
    taskId: number,
    dto: UpdateTaskStatusDto
  ): Promise<ITask> {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new NotFoundException('Task not found');

    switch (task.status) {
      case TaskStatus.New:
        //TODO: get user in token and compare with task.userId
        if (
          dto.customerId === task.customerId &&
          (dto.status === TaskStatus.Canceled ||
            (dto.status === TaskStatus.InWork && task.executorId))
        ) {
          return this.taskRepository.updateTaskStatus(taskId, dto.status);
        }
        break;
      case TaskStatus.InWork:
        //TODO: также проверить user === task.executorId
        if (
          dto.status === TaskStatus.Failed ||
          dto.status === TaskStatus.Done
        ) {
          return this.taskRepository.updateTaskStatus(taskId, dto.status);
        }
        break;
    }
    throw new BadRequestException('Something went wrong');
  }

  async setAcceptedResponse(
    acceptedResponse: IResponse
  ): Promise<ITask | null> {
    const task = await this.findOne(acceptedResponse.taskId);
    const price = acceptedResponse.offerPrice ?? task.price;
    const executorTaskInWork = this.taskRepository.findExecutorInWork(
      acceptedResponse.executorId
    );

    if (!task) throw new NotFoundException('Task not found');
    if (task.executorId)
      throw new BadRequestException('The executor already exists');
    if (executorTaskInWork)
      throw new BadRequestException('The executor already has a job');

    return this.taskRepository.setAcceptedResponse(
      task.taskId,
      acceptedResponse.executorId,
      price
    );
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
