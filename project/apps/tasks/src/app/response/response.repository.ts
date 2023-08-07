import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { ResponseEntity } from './response.entity';
import { IResponse } from '@project/shared/app-types';

@Injectable()
export class ResponseRepository
  implements CRUDRepository<ResponseEntity, number, IResponse>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ResponseEntity): Promise<IResponse> {
    return this.prisma.response.create({
      data: {
        offerPrice: item.offerPrice,
        userId: item.userId,
        task: { connect: { taskId: item.taskId } },
      },
    });
  }

  public async destroy(id: number): Promise<void> {
    await this.prisma.response.delete({
      where: {
        responseId: id,
      },
    });
  }

  public findById(id: number): Promise<IResponse | null> {
    return this.prisma.response.findFirst({
      where: {
        responseId: id,
      },
    });
  }

  public findByTaskId(taskId: number): Promise<IResponse[]> {
    return this.prisma.response.findMany({
      where: { taskId },
    });
  }

  public findByUserId(userId: string): Promise<IResponse[]> {
    return this.prisma.response.findMany({
      where: { userId },
    });
  }

  public update(responseId: number, item: ResponseEntity): Promise<IResponse> {
    return this.prisma.response.update({
      where: {
        responseId,
      },
      data: { ...item.toObject(), responseId },
    });
  }
}
