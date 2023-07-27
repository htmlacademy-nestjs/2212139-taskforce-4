import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class ExecuterBlogUserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13',
  })
  @Expose()
  public id: string;

  @ApiProperty({
    description: 'User full name',
    example: 'Keks',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local',
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург',
  })
  @Expose()
  public city: City;

  @ApiProperty({
    description: 'User date registration (ISO format)',
    example: '2021-03-12',
  })
  @Expose()
  public registrationDate: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'About user',
    example: 'Студент',
  })
  @Expose()
  public about: string;

  @ApiProperty({
    description: 'Age in years',
    example: '30',
  })
  @Expose()
  public age: number;

  @ApiProperty({
    description: 'Executant rating',
    example: '4',
  })
  @Expose()
  public rating: number;

  @ApiProperty({
    description: 'Number of completed tasks',
    example: '7',
  })
  @Expose()
  public doneCount: number;

  @ApiProperty({
    description: 'Number of failed tasks',
    example: '1',
  })
  @Expose()
  public failedCount: number;

  @ApiProperty({
    description: 'Specialization',
    example: 'Курьер',
  })
  @Expose()
  public specialization: string[];

  @ApiProperty({
    description: 'Place in the ranking',
    example: '715',
  })
  @Expose()
  public ranking: number;
}
