import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString, Length } from 'class-validator';

const MIN_COMMENT_TEXT_LENGTH = 10;
const MAX_COMMENT_TEXT_LENGTH = 300;

export class CreateCommentDto {
  @ApiProperty({
    description: 'Comment text',
    example: 'Very good work!',
    required: true,
  })
  @IsString()
  @Length(MIN_COMMENT_TEXT_LENGTH, MAX_COMMENT_TEXT_LENGTH)
  public text: string;

  @ApiProperty({
    description: 'Уникальный Id задачи',
    example: 1,
    required: true,
  })
  @IsNumber()
  @Transform(({ value }) => +value)
  public taskId: number;

  @ApiProperty({
    description: 'Author of comment',
    example: '13',
    required: true,
  })
  @IsString()
  public userId: string;
}
