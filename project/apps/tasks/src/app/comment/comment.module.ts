import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CommentRepository } from './comment.repository';
import { TaskModule } from '../task/task.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [TaskModule, PrismaModule],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentService],
})
export class CommentModule {}
