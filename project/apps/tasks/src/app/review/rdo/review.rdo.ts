import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Review id',
    example: '3',
  })
  @Expose({ name: 'reviewId' })
  public id: number;

  @ApiProperty({
    description: 'Review evaluation',
    example: '4',
  })
  @Expose()
  public evaluation: number;

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
  public createdAt: Date;
}
