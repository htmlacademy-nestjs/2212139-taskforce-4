import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ReviewRdo {
  @ApiProperty({
    description: 'Id отзыва',
    example: '3',
  })
  @Expose()
  public reviewId: string;

  @ApiProperty({
    description: 'Оценка за работу',
    example: '4',
  })
  @Expose()
  public evaluation: string;

  @ApiProperty({
    description: 'Id заказчика',
    example: '13dkajdfe3',
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Id исполнителя',
    example: '4dkfaldfkac3',
  })
  @Expose()
  public executorId: string;

  @ApiProperty({
    description: 'Дата создания отзыва',
    example: '2023-07-12',
  })
  @Expose()
  public createdAt: string;
}
