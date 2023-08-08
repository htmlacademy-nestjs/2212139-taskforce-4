import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Id комментария',
    example: '3',
  })
  @Expose()
  public commentId: string;

  @ApiProperty({
    description: 'Текст комментария. Длинна: мин 10 макс 300 символов',
    example: 'Very good work!',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Id автора комментария',
    example: '13',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Дата создания комментария',
    example: '2023-07-12',
  })
  @Expose()
  public createdAt: string;

  @ApiProperty({
    description: 'Дата обновления комментария',
    example: '2023-07-13',
  })
  @Expose()
  public updatedAt: string;
}
