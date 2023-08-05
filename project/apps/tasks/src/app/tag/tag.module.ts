import { Module } from '@nestjs/common';
import { TagsService } from './tag.service';
import { TagsController } from './tag.controller';

@Module({
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
