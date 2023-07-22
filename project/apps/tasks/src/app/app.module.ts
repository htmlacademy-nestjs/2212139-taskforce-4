import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ReviewModule } from './review/review.module';
import { TagsModule } from './tags/tags.module';
import { TaskModule } from './task/task.module';

@Module({
  imports: [
    CategoryModule,
    CommentModule,
    ReviewModule,
    TagsModule,
    TaskModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
