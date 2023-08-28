import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 500;
const MIN_EVALUATION = 1;
const MAX_EVALUATION = 5;

export class CreateReviewDto {
  @ApiProperty({
    description: 'Содержание отзыва',
    example: 'Good job',
  })
  @IsString()
  @Length(MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH)
  public review: string;

  @ApiProperty({
    description: 'Оценка за работу',
    example: '4',
  })
  @IsNumber()
  @Min(MIN_EVALUATION)
  @Max(MAX_EVALUATION)
  public evaluation: number;

  @ApiProperty({
    description: 'Id задания',
    example: '4',
  })
  @IsString()
  public taskId: string;

  @ApiProperty({
    description: 'Id заказчика',
    example: 'dlkfjaldkds4',
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Id исполнителя',
    example: '4dkfaldfkac3',
  })
  @IsString()
  public executorId: string;
}
