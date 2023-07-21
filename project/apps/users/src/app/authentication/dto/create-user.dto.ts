import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class CreateUserDto {
  @ApiProperty({
    description: 'User unique address',
    example: 'user@user.ru',
  })
  public email: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1988-03-12',
  })
  public dateBirth: string;

  @ApiProperty({
    description: 'User name',
    example: 'Ivan Ivanov',
  })
  public name: string;

  @ApiProperty({
    description: 'About user',
    example: 'Gamer',
  })
  public about?: string;

  @ApiProperty({
    description: 'User password',
    example: '123456',
  })
  public password: string;

  @ApiProperty({
    enum: City,
    description: 'User city',
    example: 'Москва',
  })
  public city: City;

  @ApiProperty({
    enum: UserRole,
    description: 'User role',
    example: 'customer',
  })
  public role: UserRole;

  @ApiProperty({
    description: 'User avatar filepath',
    example: './images/user.png',
  })
  public avatar?: string;
}
