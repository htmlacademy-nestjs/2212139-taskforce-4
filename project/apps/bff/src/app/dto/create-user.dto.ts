import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';
import { IsEmail, IsEnum, IsISO8601, IsString, Length } from 'class-validator';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID,
  ValidateCondition,
} from '../user.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'Почта пользователя',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'Дата рождения пользователя',
    example: '1988-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Ivan Ivanov',
  })
  @IsString()
  @Length(ValidateCondition.MinNameLength, ValidateCondition.MaxNameLength)
  public name: string;

  @ApiProperty({
    description: 'О пользователе',
    example: 'Gamer',
    required: false,
  })
  @IsString()
  public about?: string;

  @ApiProperty({
    description: 'Пароль пользователя',
    example: '123456',
    required: true,
  })
  @IsString()
  @Length(
    ValidateCondition.MinPasswordLength,
    ValidateCondition.MaxPasswordLength
  )
  public password: string;

  @ApiProperty({
    enum: City,
    description: 'Город местонахождения пользователя',
    example: 'Москва',
  })
  @IsEnum(City)
  public city: City;

  @ApiProperty({
    enum: UserRole,
    description:
      'Роль пользователя. Заказчик (customer) или исполнитель (executor)',
    example: 'customer',
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'Файловый путь к аватару пользователя',
    example: './images/user.png',
  })
  @IsString()
  public avatar?: string;
}
