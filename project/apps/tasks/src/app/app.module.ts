import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { CommentModule } from './comment/comment.module';
import { ReviewModule } from './review/review.module';
import { TagsModule } from './tag/tag.module';
import { TaskModule } from './task/task.module';
import { PrismaModule } from './prisma/prisma.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    PrismaModule,
    CategoryModule,
    CommentModule,
    ReviewModule,
    TagsModule,
    TaskModule,
    ResponseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
