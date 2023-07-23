import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Very good work!',
  })
  public text: string;

  @ApiProperty({
    description: 'Author of comment',
    example: '13',
  })
  public userId: string;
}
