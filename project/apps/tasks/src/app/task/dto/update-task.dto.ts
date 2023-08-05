import { ApiProperty } from '@nestjs/swagger';
import { City, TaskStatus } from '@project/shared/app-types';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  MinDate,
} from 'class-validator';
import { ValidTask } from '../task.constant';
import { Transform } from 'class-transformer';

export class UpdateTaskDto {
  @ApiProperty({
    description: 'Task title',
    example: 'Доставка',
  })
  @IsString()
  @Length(ValidTask.MinTitleLength, ValidTask.MaxTitleLength)
  public title?: string;

  @ApiProperty({
    description: 'Task details',
    example: 'Details ...',
  })
  @IsString()
  @Length(ValidTask.MinDetailsLength, ValidTask.MaxDetailsLength)
  public details?: string;

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @IsNumber()
  @IsOptional()
  @Min(ValidTask.MinPrice)
  public price?: number;

  @ApiProperty({
    description: 'Изображение',
    example: 'гвоздь.jpg',
  })
  @IsOptional()
  public image?: string;

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
    description: 'City',
    example: 'Москва',
  })
  @IsString()
  @Transform(({ value }) => value as City)
  public city?: City;

  @ApiProperty({
    description: 'Текущий статус задачи',
    example: 'new',
  })
  @IsEnum(TaskStatus)
  @Transform(({ value }) => value as TaskStatus)
  public status?: TaskStatus;
}
