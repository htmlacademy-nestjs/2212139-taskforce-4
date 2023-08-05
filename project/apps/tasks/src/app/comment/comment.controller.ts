import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CommentRdo } from './rdo/comment.rdo';

@ApiTags('comment')
@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new comment has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    const newComment = await this.commentService.create(createCommentDto);
    return fillObject(CommentRdo, newComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatusCode.Ok,
    description: 'All comments query',
  })
  @Get()
  async findAll() {
    const allComments = await this.commentService.findAll();
    return fillObject(CommentRdo, allComments);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatusCode.Ok,
    description: 'Find comment by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const currentComment = await this.commentService.findOne(+id);
    return fillObject(CommentRdo, currentComment);
  }

  @ApiResponse({
    type: CommentRdo,
    status: HttpStatusCode.Ok,
    description: 'Update comment',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<CommentRdo> {
    const updatedComment = await this.commentService.update(
      +id,
      updateCommentDto
    );
    return fillObject(CommentRdo, updatedComment);
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
