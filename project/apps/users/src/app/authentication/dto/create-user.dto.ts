import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';
import { IsEmail, IsEnum, IsISO8601, IsString, Length } from 'class-validator';
import {
  AUTH_USER_DATE_BIRTH_NOT_VALID,
  AUTH_USER_EMAIL_NOT_VALID,
  ValidateCondition,
} from '../authentication.constant';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
    required: true,
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1988-03-12',
  })
  @IsISO8601({}, { message: AUTH_USER_DATE_BIRTH_NOT_VALID })
  public dateBirth: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanov',
  })
  @IsString()
  @Length(ValidateCondition.MinNameLength, ValidateCondition.MaxNameLength)
  public name: string;

  @ApiProperty({
    description: 'About user',
    example: 'Gamer',
    required: false,
  })
  @IsString()
  public about?: string;

  @ApiProperty({
    description: 'User password',
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
    description: 'User city',
    example: 'Москва',
  })
  @IsEnum(City)
  public city: City;

  @ApiProperty({
    enum: UserRole,
    description: 'User role',
    example: 'customer',
  })
  @IsEnum(UserRole)
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar filepath',
    example: './images/user.png',
  })
  @IsString()
  public avatar?: string;
}
