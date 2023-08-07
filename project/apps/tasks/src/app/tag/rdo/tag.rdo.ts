import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class TagRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор тега',
    example: '3',
    required: true,
  })
  @Expose()
  public tagId: string;

  @ApiProperty({
    description: 'Наименование тега',
    example: 'опасная',
    required: true,
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Дата создания тега',
    example: '2023-03-03',
    required: true,
  })
  @Expose()
  public createAt: string;
}
