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
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CreateCommentDto } from '../comment/dto/create-comment.dto';
import { UpdateCommentDto } from '../comment/dto/update-comment.dto';
import { CommentRdo } from '../comment/rdo/comment.rdo';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';
import { UpdateReviewDto } from './dto/update-review.dto';

@ApiTags('review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new review has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  public async create(@Body() createReviewDto: CreateReviewDto) {
    const newReview = await this.reviewService.create(createReviewDto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'All reviews query',
  })
  @Get()
  public async findAll() {
    const allReviews = await this.reviewService.findAll();
    return fillObject(ReviewRdo, allReviews);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find review by id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const currentReview = await this.reviewService.findOne(+id);
    return fillObject(ReviewRdo, currentReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Update review',
  })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateReviewDto: UpdateReviewDto
  ) {
    const updatedReview = this.reviewService.update(+id, updateReviewDto);
    return fillObject(CommentRdo, updatedReview);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete review',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async remove(@Param('id') id: string) {
    await this.reviewService.remove(+id);
  }
}
