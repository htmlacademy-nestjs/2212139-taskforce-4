import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'Category id',
    example: '3',
    required: true,
  })
  @Expose()
  public categoryId: string;

  @ApiProperty({
    description: 'Category name',
    example: 'Delivery',
    required: true,
  })
  @Expose()
  public name: string;
}
