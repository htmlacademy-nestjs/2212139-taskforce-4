import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import dayjs from 'dayjs';
import { CommentEntity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { TaskService } from '../task/task.service';
import { IComment } from '@project/shared/app-types';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly taskService: TaskService
  ) {}

  async create(dto: CreateCommentDto) {
    const { text, userId, taskId } = dto;
    const newComment = {
      text,
      userId,
      taskId,
      createdAt: dayjs().toDate(),
    };
    const commentEntity = new CommentEntity(newComment);
    await this.taskService.incrementCommentsCounter(taskId, +1);
    return this.commentRepository.create(commentEntity);
  }

  public async findCommentsByTaskId(taskId: number): Promise<IComment[]> {
    return this.commentRepository.findByTaskId(taskId);
  }

  public async remove(id: number): Promise<void> {
    const comment = await this.commentRepository.findById(id);
    const taskId = comment.taskId;
    await this.commentRepository.destroy(id);
    await this.taskService.incrementCommentsCounter(taskId, -1);
  }
}
