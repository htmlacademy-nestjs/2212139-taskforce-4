import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './task.entity';
import {
  IResponse,
  ITask,
  SortType,
  TaskStatus,
  UserRole,
} from '@project/shared/app-types';
import { TaskRepository } from './task.repository';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { TaskQuery } from './task.query';
import {
  TASK_STATUS_CONDITIONS_WRONG,
  TASK_FORBIDDEN,
  TASK_NOT_FOUND,
  TASK_CANT_TAKE,
  TASK_EXECUTOR_APPOINTED as TASK_EXECUTOR_APPOINTED,
  TAGS_MAX_COUNT,
  TASK_EXECUTOR_EXISTS,
  TASK_EXECUTOR_A_HAS_JOB,
  RESPONSE_NOT_FOUND,
} from './task.constant';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';
import { ResponseService } from '../response/response.service';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly responseService: ResponseService
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
    if (!task) throw new NotFoundException(TASK_NOT_FOUND);

    if (dto.userId !== task.userId && dto.userId !== task.executorId) {
      throw new ForbiddenException(TASK_FORBIDDEN);
    }

    switch (task.status) {
      case TaskStatus.New:
        if (
          dto.userId === task.userId &&
          ((dto.status === TaskStatus.Canceled && !task.executorId) ||
            dto.status === TaskStatus.InWork)
        ) {
          return this.taskRepository.updateStatus(taskId, dto.status);
        }
        break;
      case TaskStatus.InWork:
        if (
          dto.executorId === task.executorId &&
          (dto.status === TaskStatus.Failed || dto.status === TaskStatus.Done)
        ) {
          return this.taskRepository.updateStatus(taskId, dto.status);
        }
        break;
    }
    throw new BadRequestException(TASK_STATUS_CONDITIONS_WRONG);
  }

  async setAcceptedResponse(
    acceptedResponse: IResponse
  ): Promise<ITask | null> {
    const task = await this.findOne(acceptedResponse.taskId);
    const price = acceptedResponse.offerPrice ?? task.price;
    const executorTaskInWork = this.taskRepository.findExecutorInWork(
      acceptedResponse.executorId
    );

    if (!task) throw new NotFoundException(TASK_NOT_FOUND);
    if (task.executorId) throw new BadRequestException(TASK_EXECUTOR_EXISTS);

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

  async deleteTask(id: number): Promise<void> {
    this.taskRepository.destroy(id);
  }

  async getTask(id: number) {
    return this.taskRepository.findById(id);
  }

  async getTasks(query: TaskQuery) {
    return this.taskRepository.find(query);
  }

  async getNewTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      userId: userId,
      status: TaskStatus.New,
    });
  }

  async getCustomerTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      userId: userId,
      sortType: SortType.CreatedAt,
    });
  }

  async getCustomerTasksNumber(userId: string, query: TaskQuery) {
    return this.taskRepository.countCustomerTasks({ ...query, userId: userId });
  }

  async getExecutorTasks(userId: string, query: TaskQuery) {
    return this.taskRepository.find({
      ...query,
      executorId: userId,
      sortType: SortType.Status,
    });
  }

  async getExecutorTasksNumber(executorId: string, query: TaskQuery) {
    return this.taskRepository.countExecutorTasks({
      ...query,
      executorId,
    });
  }

  public async addExecutor(taskId: number, dto: UpdateTaskResponseDto) {
    const { role, userId, offerPrice } = dto;

    if (role !== UserRole.Executor) {
      throw new ForbiddenException(TASK_CANT_TAKE);
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    if (task.executorId) {
      throw new ForbiddenException(TASK_EXECUTOR_APPOINTED);
    }

    const executorTaskInWork = this.taskRepository.findExecutorInWork(userId);

    if (executorTaskInWork)
      throw new BadRequestException(TASK_EXECUTOR_A_HAS_JOB);

    const price = offerPrice ?? task.price;

    return this.taskRepository.addExecutor(taskId, userId, price);
  }

  public async addResponse(taskId: number, dto: UpdateTaskResponseDto) {
    const { role, userId, offerPrice } = dto;

    if (role !== UserRole.Executor) {
      throw new ForbiddenException(TASK_CANT_TAKE);
    }

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new NotFoundException(TASK_NOT_FOUND);
    }

    const price = offerPrice ?? task.price;

    const response = this.responseService.create({
      executorId: userId,
      taskId,
      offerPrice: price,
    });

    if (!response) {
      throw new NotFoundException(RESPONSE_NOT_FOUND);
    }

    const responseId = (await response).responseId;
    return await this.taskRepository.addResponse(responseId, taskId);
  }
}
