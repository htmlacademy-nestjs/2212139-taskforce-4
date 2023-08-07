import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

const MIN_REVIEW_LENGTH = 50;
const MAX_REVIEW_LENGTH = 500;
const MIN_EVALUATION = 1;
const MAX_EVALUATION = 5;

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review task',
    example: 'Good job',
  })
  @IsString()
  @Length(MIN_REVIEW_LENGTH, MAX_REVIEW_LENGTH)
  public review: string;

  @ApiProperty({
    description: 'Evaluation',
    example: '4',
  })
  @IsNumber()
  @Min(MIN_EVALUATION)
  @Max(MAX_EVALUATION)
  public evaluation: number;

  @ApiProperty({
    description: 'Task id',
    example: '4',
  })
  @IsNumber()
  public taskId: number;

  @ApiProperty({
    description: 'User id',
    example: '4',
  })
  @IsNumber()
  public userId: string;

  @ApiProperty({
    description: 'Id исполнителя',
    example: '4',
  })
  @IsNumber()
  public executorId: string;
}
