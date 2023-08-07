import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@project/shared/app-types';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Один из статусов: New, Canceled, InWork, Done, Failed.',
    example: 'InWork',
  })
  public status: TaskStatus;

  @ApiProperty({
    description: 'Уникальный идентификатор заказчика.',
    example: '123456',
  })
  public userId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя.',
    example: '123456',
  })
  public executorId: string;
}
