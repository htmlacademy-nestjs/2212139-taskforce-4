import { ApiProperty } from '@nestjs/swagger';
import { City } from '@project/shared/app-types';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Доставка',
  })
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  public details: string;

  @ApiProperty({
    description: 'Category id',
    example: '15',
  })
  public categoryId: number;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  public price: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  public deadline: Date;

  @ApiProperty({
    description: 'Workplace address',
    example: 'Address ...',
  })
  public address: string;

  @ApiProperty({
    description: 'Tags',
    example: 'доставка быстро аккуратно',
  })
  public tags: string[];

  @ApiProperty({
    description: 'City',
    example: 'Москва',
  })
  public city: City;
}
