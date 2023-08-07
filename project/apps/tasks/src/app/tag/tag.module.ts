import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagsController } from './tag.controller';
import { TagRepository } from './tag.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TagsController],
  providers: [TagService, TagRepository],
  exports: [TagService],
})
export class TagsModule {}
