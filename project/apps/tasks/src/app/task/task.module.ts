import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskRepository } from './task.repository';
import { CategoryModule } from '../category/category.module';
import { TagsModule } from '../tag/tag.module';
import { PrismaModule } from '../prisma/prisma.module';
import { ResponseModule } from '../response/response.module';
import { ReviewModule } from '../review/review.module';

@Module({
  imports: [
    CategoryModule,
    TagsModule,
    PrismaModule,
    ResponseModule,
    ReviewModule,
  ],
  controllers: [TaskController],
  providers: [TaskService, TaskRepository],
  exports: [TaskRepository, TaskService],
})
export class TaskModule {}
