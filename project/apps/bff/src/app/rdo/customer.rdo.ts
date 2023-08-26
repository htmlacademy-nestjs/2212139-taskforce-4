import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class CustomerBlogUserRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'Имя пользователя',
    example: 'Keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Почта пользователя',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'Город пользователя',
    example: 'Санкт-Петербург',
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'Дата регистрации пользователя',
    example: '2021-03-12',
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: 'Роль пользователя',
    example: 'customer',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'О себе',
    example: 'Предприниматель',
  })
  @Expose()
  public about: string;

  @ApiProperty({
    description: 'Количество заданий',
    example: '12',
  })
  @Expose()
  public taskCount: number;

  @ApiProperty({
    description: 'Количество новых заданий',
    example: '3',
  })
  @Expose()
  public newCount: number;
}
