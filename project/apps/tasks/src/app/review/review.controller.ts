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
import { CommentRdo } from '../comment/rdo/comment.rdo';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRdo } from './rdo/review.rdo';

@ApiTags('Actions with review')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new review has been successfully created.',
    type: ReviewRdo,
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  public async create(@Body() dto: CreateReviewDto) {
    const newReview = this.reviewService.create(dto);
    return fillObject(ReviewRdo, newReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'All reviews query',
  })
  @Get()
  public async findAll() {
    const allReviews = this.reviewService.findAll();
    return fillObject(ReviewRdo, allReviews);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find review by id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const currentReview = this.reviewService.findOne(+id);
    return fillObject(ReviewRdo, currentReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find review by taskId',
  })
  @Patch('task/:id')
  public async findByTaskId(@Param('id') taskId: string) {
    const existsReview = this.reviewService.findByTaskId(+taskId);
    return fillObject(ReviewRdo, existsReview);
  }

  @ApiResponse({
    type: ReviewRdo,
    status: HttpStatusCode.Ok,
    description: 'Find reviews by executor Id',
  })
  @Patch('executor/:id')
  public async findByExecurotId(@Param('id') executorId: string) {
    const existsReview = this.reviewService.findByExecutorId(executorId);
    return fillObject(ReviewRdo, existsReview);
  }

  @ApiResponse({
    status: HttpStatusCode.Ok,
    description: 'Find rating of executor',
  })
  @Patch('rating/:id')
  public async findRatingByExecurotId(@Param('id') executorId: string) {
    return this.reviewService.findRating(executorId);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete review',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async remove(@Param('id') id: string) {
    this.reviewService.remove(+id);
  }
}
