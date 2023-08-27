import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Min,
  MinDate,
} from 'class-validator';
import { ValidTask } from '../task.constant';
import { Transform } from 'class-transformer';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Заголовок задания',
    example: 'Поменять лампочку',
  })
  @IsString()
  @Length(ValidTask.MinTitleLength, ValidTask.MaxTitleLength)
  public title: string;

  @ApiProperty({
    description: 'Дополнительная информация по заданию',
    example: 'Обязательно светодиодную',
  })
  @IsString()
  @Length(ValidTask.MinDetailsLength, ValidTask.MaxDetailsLength)
  public details: string;

  @ApiProperty({
    description: 'Категория задания',
    example: 'Электрика',
  })
  @IsString()
  @Transform(({ value }) => +value)
  public categoryId: number;

  @ApiProperty({
    description: 'Пояснительное изображние',
    example: 'гвоздь.jpg',
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Цена. Любое положительное число, или ноль.',
    example: '1500',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(ValidTask.MinPrice)
  public price?: number;

  @ApiProperty({
    description: 'Конечная дата исполнения задания',
    example: '2023-03-12',
  })
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  public deadline?: Date;

  @ApiProperty({
    description: 'Адрес местонахождения задания',
    example: 'Address ...',
  })
  @IsString()
  @IsOptional()
  @Length(ValidTask.MinAddressLength, ValidTask.MaxAddressLength)
  public address?: string;

  @ApiProperty({
    description: 'Тэги задания',
    example: 'доставка быстро аккуратно',
  })
  @IsOptional()
  public tags?: string[];

  @ApiProperty({
    description: 'Город, в котором создано задание',
    example: 'Москва',
  })
  @IsString()
  public city: string;

  @ApiProperty({
    description: 'Текущий статус задачи',
    example: 'New',
  })
  @IsString()
  public status: string;
}
