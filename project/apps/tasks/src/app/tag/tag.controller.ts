import { Controller, Get } from '@nestjs/common';
import { TagService } from './tag.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { TagRdo } from './rdo/tag.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Actions with tags')
@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagService) {}

  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'Список всех тегов',
    type: TagRdo,
  })
  @Get()
  findAllTags() {
    const tags = this.tagsService.getTags();
    return fillObject(TagRdo, tags);
  }
}
