import { Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ICategory, IComment, ITag } from '@project/shared/app-types';

export class TaskRdo {
  @ApiProperty({
    description: 'Id задания',
    example: '18',
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Доставка',
  })
  @Expose()
  public title: string;

  @ApiProperty({
    description: 'Дополнительная информация по заданию',
    example: 'Обязательно светодиодную',
  })
  @Expose()
  public details: string;

  @ApiProperty({
    description: 'Категория задания',
    example: 'Электрика',
  })
  @Expose()
  public category: ICategory;

  @ApiProperty({
    description: 'Цена. Любое положительное число, или ноль.',
    example: '1500',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'Конечная дата исполнения задания',
    example: '2023-03-12',
  })
  @Expose()
  public deadline: string;

  @ApiProperty({
    description: 'Пояснительное изображние',
    example: 'гвоздь.jpg',
  })
  @Expose()
  public image: string;

  @ApiProperty({
    description: 'Адрес местонахождения задания',
    example: 'Address ...',
  })
  @Expose()
  public address: string;

  @ApiProperty({
    description: 'Тэги задания',
    example: 'доставка быстро аккуратно',
  })
  @Expose()
  @Transform(({ value }) => value.map((tag: ITag) => tag.name))
  public tags: ITag[];

  @ApiProperty({
    description: 'Город, в котором создано задание',
    example: 'Москва',
  })
  @Expose()
  public city: string;

  @ApiProperty({
    description: 'Дата создания задания',
    example: '2023-03-12',
  })
  @Expose()
  public createdAt: Date;

  @ApiProperty({
    description: 'Дата обновления задания',
    example: '2023-03-12',
  })
  @Expose()
  public updatedAt: Date;

  @ApiProperty({
    description: 'Текущий статус задачи',
    example: 'New',
  })
  @Expose()
  public status: string;

  @ApiProperty({
    description: 'Количество откликов.',
    example: '3',
  })
  @Expose()
  public responsesCont: number;

  @ApiProperty({
    description: 'Id комментариев.',
    example: '33',
  })
  @Expose()
  public comments: IComment[];

  @ApiProperty({
    description: 'Количество комментариев.',
    example: '33',
  })
  @Expose()
  public commentsCount: number;

  @ApiProperty({
    description: 'Id заказчика',
    example: '383j3j3jh3432kjjhkjgdf',
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Id исполнителя',
    example: '383j3j3jh3432kjjhkjgdf',
  })
  @Expose()
  public executorId: string;
}
