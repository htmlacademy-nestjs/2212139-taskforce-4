import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'Id категории',
    example: '3',
    required: true,
  })
  @Expose()
  public categoryId: string;

  @ApiProperty({
    description: 'Имя категории',
    example: 'Delivery',
    required: true,
  })
  @Expose()
  public name: string;
}
