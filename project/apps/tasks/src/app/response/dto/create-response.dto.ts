import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя.',
    example: '123456',
    required: true,
  })
  public executorId: string;

  @ApiProperty({
    description: 'Идентификатор задания',
    example: '2',
    required: true,
  })
  public taskId: number;

  @ApiProperty({
    description: 'Предлагаемая исполнителем цена работы',
    example: 99,
    required: false,
  })
  public offerPrice?: number;
}
