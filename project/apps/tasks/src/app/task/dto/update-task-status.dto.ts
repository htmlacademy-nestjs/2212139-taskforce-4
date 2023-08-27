import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@project/shared/app-types';

export class UpdateTaskStatusDto {
  @ApiProperty({
    description: 'Один из статусов: New, Canceled, InWork, Done, Failed.',
    example: 'InWork',
  })
  public status: TaskStatus;

  @ApiProperty({
    description: 'Уникальный id заказчика.',
    example: '123aldfaldfa456',
  })
  public customerId: string;

  @ApiProperty({
    description: 'Уникальный id исполнителя.',
    example: '1dsf3sdk4sdf5di6',
  })
  public executorId: string;
}
