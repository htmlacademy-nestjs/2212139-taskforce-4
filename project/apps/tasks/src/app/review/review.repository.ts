import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ReviewEntity } from './review.entity';
import { IReview } from '@project/shared/app-types';
import { CRUDRepository } from '@project/util/util-types';

@Injectable()
export class ReviewRepository
  implements CRUDRepository<ReviewEntity, number, IReview>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: ReviewEntity): Promise<IReview> {
    const entityData = item.toObject();
    return this.prisma.review.create({
      data: {
        ...entityData,
      },
    });
  }

  public findById(reviewId: number): Promise<IReview | null> {
    return this.prisma.review.findFirst({
      where: {
        reviewId,
      },
    });
  }

  public findByTaskId(taskId: number): Promise<IReview | null> {
    return this.prisma.review.findFirst({
      where: {
        taskId,
      },
    });
  }

  public findByExecutorId(executorId: string): Promise<IReview[]> {
    return this.prisma.review.findMany({
      where: {
        executorId,
      },
    });
  }

  public async getRatingSum(executorId: string): Promise<number> {
    const ratingSum = await this.prisma.review.aggregate({
      _sum: {
        evaluation: true,
      },
      where: {
        executorId,
      },
    });
    return ratingSum._sum.evaluation;
  }

  public async destroy(reviewId: number): Promise<void> {
    await this.prisma.review.delete({
      where: {
        reviewId,
      },
    });
  }

  public async destroyByExecutorId(executorId: string): Promise<void> {
    await this.prisma.review.deleteMany({
      where: {
        executorId,
      },
    });
  }

  public update(reviewId: number, item: ReviewEntity): Promise<IReview> {
    return Promise.resolve(undefined);
  }
}
