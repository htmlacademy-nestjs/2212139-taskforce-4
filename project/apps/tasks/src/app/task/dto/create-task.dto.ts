import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus } from '@project/shared/app-types';
import {
  IsArray,
  IsDate,
  IsEnum,
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
    description: 'Task title',
    example: 'Доставка',
  })
  @IsString()
  @Length(ValidTask.MinTitleLength, ValidTask.MaxTitleLength)
  public title: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  @IsString()
  @Length(ValidTask.MinDetailsLength, ValidTask.MaxDetailsLength)
  public details: string;

  @ApiProperty({
    description: 'Category id',
    example: '15, 3',
  })
  @IsString()
  public categoryId: number;

  @ApiProperty({
    description: 'Comments id',
    example: '15, 12, 3',
  })
  @IsArray()
  public comments?: string[];

  @ApiProperty({
    description: 'Изображение',
    example: 'гвоздь.jpg',
  })
  @IsOptional()
  public image?: string;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @IsNumber()
  @IsOptional()
  @IsPositive()
  @Min(ValidTask.MinPrice)
  public price?: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  public deadline?: Date;

  @ApiProperty({
    description: 'Workplace address',
    example: 'Address ...',
  })
  @IsString()
  @IsOptional()
  @Length(ValidTask.MinAddressLength, ValidTask.MaxAddressLength)
  public address?: string;

  @ApiProperty({
    description: 'Tags',
    example: 'доставка быстро аккуратно',
  })
  @IsOptional()
  public tags?: number[];

  @ApiProperty({
    description: 'City',
    example: 'Москва',
  })
  @IsString()
  @IsEnum(City)
  @Transform(({ value }) => value as City)
  public city: City;

  @ApiProperty({
    description: 'userId',
    example: '23938fadakljk3k2kj23jk2j',
  })
  @IsString()
  public userId: string;

  @ApiProperty({
    description: 'Текущий статус задачи',
    example: 'new',
  })
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value as TaskStatus)
  public status: TaskStatus;
}
