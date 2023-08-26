import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class ExecuterBlogUserRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя',
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
    example: 'Студент',
  })
  @Expose()
  public about: string;

  @ApiProperty({
    description: 'Возраст',
    example: '30',
  })
  @Expose()
  public age: number;

  @ApiProperty({
    description: 'Рейтинг',
    example: '4',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Количество выполненных заданий',
    example: '7',
  })
  @Expose()
  public doneCount: number;

  @ApiProperty({
    description: 'Количество не выполненных заданий',
    example: '1',
  })
  @Expose()
  public failedCount: number;

  @ApiProperty({
    description: 'Специализации',
    example: 'Курьер',
  })
  @Expose()
  public specialization: string[];

  @ApiProperty({
    description: 'Ранг пользователя',
    example: '715',
  })
  @Expose()
  public ranking: number;
}
