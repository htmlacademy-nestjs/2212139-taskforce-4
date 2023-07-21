import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { City, UserRole } from '@project/shared/app-types';

export class CustomerBlogUserRdo {
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
  public dateRegistration: string;

  @ApiProperty({
    description: 'User role',
    example: 'customer',
  })
  @Expose()
  public role: UserRole;

  @ApiProperty({
    description: 'About user',
    example: 'Предприниматель',
  })
  @Expose()
  public about: string;

  @ApiProperty({
    description: 'Number of published tasks',
    example: '12',
  })
  @Expose()
  public taskCount: number;

  @ApiProperty({
    description: 'The number of tasks with the status "new"',
    example: '3',
  })
  @Expose()
  public newCount: number;
}
