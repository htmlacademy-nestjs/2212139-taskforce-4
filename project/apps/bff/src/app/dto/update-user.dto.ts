import { ApiProperty } from '@nestjs/swagger';
import { City } from '@project/shared/app-types';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  ValidateCondition,
} from '../user.constant';
import { IsEnum, IsISO8601, IsString, Length } from 'class-validator';

export class UpdateBlogUserDto {
  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Keks',
  })
  @IsString()
  @Length(ValidateCondition.MinNameLength, ValidateCondition.MaxNameLength)
  public name?: string;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1981-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth?: Date;

  @ApiProperty({
    description: 'О пользователе',
    example: 'Студент',
  })
  @IsString()
  public about?: string;

  @ApiProperty({
    description: 'Специализация',
    example: 'Курьер',
  })
  public specialization?: string[];

  @ApiProperty({
    description: 'Город проживания',
    example: 'Санкт-Петербург',
  })
  @IsString()
  @IsEnum(City)
  public city?: City;
}
