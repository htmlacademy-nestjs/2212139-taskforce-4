import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 10;

export class CreateTagDto {
  @ApiProperty({
    description: 'Имя тега задания. Мин. длинна 3, макс 10',
    example: 'Доставка',
  })
  @IsString()
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH)
  public name: string;
}
