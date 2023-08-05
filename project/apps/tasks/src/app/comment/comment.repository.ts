import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { CommentEntity } from './comment.entity';
import { Comment } from '@project/shared/app-types';

@Injectable()
export class CommentRepository
  implements CRUDRepository<CommentEntity, number, Comment>
{
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(commentId: number): Promise<void> {
    await this.prisma.comment.delete({
      where: {
        commentId,
      },
    });
  }

  public findById(id: number): Promise<Comment | null> {
    return this.prisma.comment.findFirst({
      where: {
        id,
      },
    });
  }

  public find(ids: number[] = []): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {
        commentId: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(id: number, item: CommentEntity): Promise<Comment> {
    return this.prisma.comment.update({
      where: {
        commentId: id,
      },
      data: { ...item.toObject(), id },
    });
  }
}
