import { Module } from '@nestjs/common';
import { BlogUserMemoryRepository } from './blog-user-memory.repository';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';

@Module({
  providers: [BlogUserMemoryRepository, BlogUserService],
  exports: [BlogUserMemoryRepository],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
