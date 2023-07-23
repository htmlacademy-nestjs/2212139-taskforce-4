import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description: 'Review task',
    example: 'Good job',
  })
  public review: string;

  @ApiProperty({
    description: 'Evaluation',
    example: '4',
  })
  public evaluation: number;

  @ApiProperty({
    description: 'Task id',
    example: '4',
  })
  public taskId: number;
}
