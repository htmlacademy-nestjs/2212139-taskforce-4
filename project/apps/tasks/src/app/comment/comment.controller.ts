import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('Actions with task comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new comment has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  async create(@Body() dto: CreateCommentDto) {
    const newComment = await this.commentService.create(dto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: [CommentRdo],
    status: HttpStatusCode.Ok,
    description: 'Find all comments by TaskId',
  })
  @Get(':id')
  async findTaskComments(@Param('id') id: string) {
    const currentComment = await this.commentService.findCommentsByTaskId(+id);
    return fillObject(CommentRdo, currentComment);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete comment',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  async remove(@Param('id') id: string) {
    this.commentService.remove(+id);
  }
}
