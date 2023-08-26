import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import { AUTH_USER_EMAIL_NOT_VALID, ValidateCondition } from '../user.constant';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'Уникальная почта пользователя',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description:
      'Старый пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12 символов',
    example: '123456',
  })
  @IsString()
  @Length(
    ValidateCondition.MinPasswordLength,
    ValidateCondition.MaxPasswordLength
  )
  public password: string;

  @ApiProperty({
    description:
      'Новый пароль пользователя. Минимальная длина пароля 6 символов, максимальная 12 символов',
    example: '123456',
  })
  @IsString()
  @Length(
    ValidateCondition.MinPasswordLength,
    ValidateCondition.MaxPasswordLength
  )
  public newPassword: string;
}
