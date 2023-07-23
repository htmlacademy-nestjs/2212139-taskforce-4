import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CategoryRdo {
  @ApiProperty({
    description: 'Category id',
    example: '3',
  })
  @Expose()
  public id: number;

  @ApiProperty({
    description: 'Category name',
    example: 'Delivery',
  })
  @Expose()
  public name: string;
}
