import { ApiProperty } from '@nestjs/swagger';
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
    description: 'User first name',
    example: 'Ivan',
  })
  @Expose()
  public firstname: string;

  @ApiProperty({
    description: 'User last name',
    example: 'Ivanov',
  })
  @Expose()
  public lastname: string;
}
