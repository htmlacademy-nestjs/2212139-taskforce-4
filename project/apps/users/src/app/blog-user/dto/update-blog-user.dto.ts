import { ApiProperty } from '@nestjs/swagger';
import { City } from '@project/shared/app-types';

export class UpdateBlogUserDto {
  @ApiProperty({
    description: 'User first name',
    example: 'Keks',
  })
  public name?: string;

  @ApiProperty({
    description: 'User birth date',
    example: '1981-03-12',
  })
  public dateBirth?: Date;

  @ApiProperty({
    description: 'About user',
    example: 'Студент',
  })
  public about?: string;

  @ApiProperty({
    description: 'Specialization',
    example: 'Курьер',
  })
  public specialization?: string[];

  @ApiProperty({
    description: 'City of residence',
    example: 'Санкт-Петербург',
  })
  public city?: City;
}
