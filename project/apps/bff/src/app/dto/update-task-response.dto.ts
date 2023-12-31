import { UserRole } from '@project/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTaskResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор пользователя.',
    example: 'd913b9e8-9ff5-4528-8fc6-4d0ffd1e0ad3',
  })
  public userId: string;

  @ApiProperty({
    description: 'Роль пользователя.',
    example: 'Customer',
    required: true,
  })
  public role: UserRole;
}
