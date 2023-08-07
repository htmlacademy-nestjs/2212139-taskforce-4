import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { TaskEntity } from './task.entity';
import { ITask, TaskStatus } from '@project/shared/app-types';

@Injectable()
export class TaskRepository
  implements CRUDRepository<TaskEntity, number, ITask>
{
  constructor(private readonly prisma: PrismaService) {}

  update(_id: number, _item: TaskEntity): Promise<ITask> {
    throw new Error('Method not implemented.');
  }

  public async create(item: TaskEntity): Promise<ITask> {
    const entityData = item.toObject();
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

  public async find(): Promise<ITask[]> {
    return await this.prisma.task.findMany({
      include: {
        comments: true,
        tags: true,
        responses: true,
      },
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
