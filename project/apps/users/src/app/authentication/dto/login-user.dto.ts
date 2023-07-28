import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';
import {
  AUTH_USER_EMAIL_NOT_VALID,
  ValidateCondition,
} from '../authentication.constant';

export class LoginUserDto {
  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @IsEmail({}, { message: AUTH_USER_EMAIL_NOT_VALID })
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  @IsString()
  @Length(
    ValidateCondition.MinPasswordLength,
    ValidateCondition.MaxPasswordLength
  )
  public password: string;
}
