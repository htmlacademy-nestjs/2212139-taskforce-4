import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Новое или существующее имя категории',
    example: 'Доставка',
    required: true,
  })
  @IsString()
  public name: string;
}
