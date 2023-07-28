import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Length } from 'class-validator';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 10;

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag task',
    example: 'delivery',
  })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  public name: string;

  @ApiProperty({
    description: 'Task id',
    example: '4',
  })
  @IsNumber()
  public taskId: number;
}
