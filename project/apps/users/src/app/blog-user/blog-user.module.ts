import { Module } from '@nestjs/common';
import { BlogUserService } from './blog-user.service';
import { BlogUserController } from './blog-user.controller';
import { BlogUserRepository } from './blog-user.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogUserModel, BlogUserSchema } from './blog-user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BlogUserModel.name, schema: BlogUserSchema },
    ]),
  ],
  providers: [BlogUserRepository, BlogUserService],
  exports: [BlogUserRepository],
  controllers: [BlogUserController],
})
export class BlogUserModule {}
