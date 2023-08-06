import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CommentRdo {
  @ApiProperty({
    description: 'Comment id',
    example: '3',
  })
  @Expose({ name: 'commentId' })
  public commentId: string;

  @ApiProperty({
    description: 'Comment text',
    example: 'Very good work!',
  })
  @Expose()
  public text: string;

  @ApiProperty({
    description: 'Author of comment',
    example: '13',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Дата создания комментария',
    example: '2023-07-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-07-13',
  })
  @Expose()
  public updatedAt: Date;
}
