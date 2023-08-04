import { ApiProperty } from '@nestjs/swagger';
import { City } from '@project/shared/app-types';
import {
  IsArray,
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
    example: '15',
  })
  @IsArray()
  public categories: number[];

  @ApiProperty({
    description: 'Price',
    example: '1500',
  })
  @IsNumber()
  @Min(ValidTask.MinPrice)
  public price: number;

  @ApiProperty({
    description: 'Deadline',
    example: '2023-03-12',
  })
  @IsDate()
  @MinDate(new Date())
  @IsOptional()
  public deadline: Date;

  @ApiProperty({
    description: 'Workplace address',
    example: 'Address ...',
  })
  @IsString()
  @Length(ValidTask.MinAddressLength, ValidTask.MaxAddressLength)
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
  @IsString()
  @IsEnum(City)
  public city: City;

  @ApiProperty({
    description: 'userId',
    example: '23938fadakljk3k2kj23jk2j',
  })
  @IsString()
  public userId?: string;
}
