import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';
import { Expose } from 'class-transformer';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.ru',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User avatar path',
    example: './images/user.png',
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1988-03-12',
  })
  @Expose()
  public dateBirth: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Ivan Ivanov',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User city',
    example: 'Санкт-Петербург',
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'User role',
    example: 'customer',
  })
  @Expose()
  public role: UserRole;
}
