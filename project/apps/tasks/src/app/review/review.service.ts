import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  findByTaskId(arg0: number) {
    throw new Error('Method not implemented.');
  }
  findByExecutorId(executorId: string) {
    throw new Error('Method not implemented.');
  }
  findRating(executorId: string) {
    throw new Error('Method not implemented.');
  }
  create(createReviewDto: CreateReviewDto) {
    return 'This action adds a new review';
  }

  findAll() {
    return `This action returns all review`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
