import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review id',
    example: '3',
  })
  @Expose()
  public reviewId: string;

  @ApiProperty({
    description: 'Review evaluation',
    example: '4',
  })
  @Expose()
  public evaluation: string;

  @ApiProperty({
    description: 'Task id',
    example: '13',
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Created at',
    example: '2023-07-12',
  })
  @Expose()
  public createdAt: string;
}
