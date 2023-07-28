import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

const MIN_COMMENT_TEXT_LENGTH = 10;
const MAX_COMMENT_TEXT_LENGTH = 300;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Very good work!',
  })
  @IsString()
  @Length(MIN_COMMENT_TEXT_LENGTH, MAX_COMMENT_TEXT_LENGTH)
  public text: string;

  @ApiProperty({
    description: 'Author of comment',
    example: '13',
  })
  @IsString()
  public userId: string;
}
