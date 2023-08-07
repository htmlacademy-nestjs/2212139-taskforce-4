import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '@project/shared/app-types';
import { Tag } from '@prisma/client';

export class TaskRdo {
  @ApiProperty({
    description: 'Task id',
    example: '18',
  })
  @Expose({ name: 'taskId' })
  public taskId: string;

  @ApiProperty({
    description: 'Task title',
    example: 'Доставка',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  @Expose()
  public details: string;

  @ApiProperty({
    description: 'One of the existing Categories',
    example: 'Delivery',
  })
  @Expose()
  public category: ICategory;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Image',
    example: 'http://example.com/r646oaer32rfr.jpg',
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Address',
    example: 'Address ...',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Tags',
    example: 'доставка быстро аккуратно',
  })
  @Expose()
  @Transform(({ value }) => value.map((tag: Tag) => tag.name))
  public tags: Tag[];

  @ApiProperty({
    description: 'City',
    example: 'Москва',
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Created at',
    example: '2023-03-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Updated at',
    example: '2023-03-12',
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Status task',
    example: 'new',
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Количество откликов.',
    example: '',
  })
  @Expose()
  public responsesCont: number;

  @ApiProperty({
    description: 'Количество комментариев.',
    example: '',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'userId',
    example: '383j3j3jh3432kjjhkjgdf',
  })
  @Expose()
  public userId: string;
}
