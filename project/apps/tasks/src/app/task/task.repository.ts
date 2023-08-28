import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';
import { ITask, TaskStatus } from '@project/shared/app-types';
import { TaskQuery } from './task.query';
import { TagService } from '../tag/tag.service';

@Injectable()
export class TaskRepository
  implements CRUDRepository<TaskEntity, number, ITask>
{
  constructor(
    private readonly prisma: PrismaService,
    private readonly tagService: TagService
  ) {}

  update(_id: number, _item: TaskEntity): Promise<ITask> {
    throw new Error('Method not implemented.');
  }

  public async create(item: TaskEntity): Promise<ITask> {
    const entityData = item.toObject();
    console.log(entityData);

    return await this.prisma.task.create({
      data: {
        ...entityData,
        comments: { connect: [] },
        responses: { connect: [] },
        tags: {
          connect: entityData.tags.map((tag) => ({
            tagId: tag.tagId,
          })),
        },
      },
      include: {
        comments: true,
        tags: true,
        category: true,
        responses: true,
      },
    });
  }

  public async destroy(taskId: number): Promise<void> {
    await this.prisma.task.delete({
      where: {
        taskId,
      },
    });
  }

  public async findById(taskId: number): Promise<ITask | null> {
    return this.prisma.task.findFirst({
      where: {
        taskId,
      },
      include: {
        comments: true,
        category: true,
        tags: true,
        responses: true,
      },
    });
  }

  public async find(query?: TaskQuery): Promise<ITask[]> {
    const {
      limit,
      sortDirection,
      sortType,
      page,
      city,
      categoryId,
      status,
      tag,
      userId,
      executorId,
    } = query;
    const existingTag = await this.tagService.findByName(tag);

    return await this.prisma.task.findMany({
      where: {
        status,
        city,
        userId,
        executorId,
        categoryId,
        tags: { ...(existingTag ? { some: { name: existingTag.name } } : {}) },
      },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true,
      },
      orderBy: [{ [sortType]: sortDirection }],
      take: limit,
      skip: page > 0 ? limit * (page - 1) : undefined,
    });
  }

  public async setAcceptedResponse(
    taskId: number,
    executorId: string,
    price?: number
  ) {
    return this.prisma.task.update({
      where: { taskId },
      data: { executorId, price },
      include: {
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }

  public async findExecutorInWork(executorId: string) {
    return this.prisma.task.findFirst({
      where: {
        executorId,
        status: TaskStatus.InWork,
      },
    });
  }

  public async updateCommentsCounter(taskId: number, commentsCount: number) {
    this.prisma.task.update({
      where: { taskId },
      data: { commentsCount },
    });
  }

  public async updateResponsesCounter(taskId: number, responsesCount: number) {
    this.prisma.task.update({
      where: { taskId },
      data: { responsesCount },
    });
  }

  public async updateTaskStatus(
    taskId: number,
    status: TaskStatus
  ): Promise<ITask> {
    return this.prisma.task.update({
      where: { taskId },
      data: { status },
      include: {
        category: true,
        comments: true,
        tags: true,
        responses: true,
      },
    });
  }
}
