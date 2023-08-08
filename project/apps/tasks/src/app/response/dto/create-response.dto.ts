import { ApiProperty } from '@nestjs/swagger';

export class CreateResponseDto {
  @ApiProperty({
    description: 'Уникальный id исполнителя.',
    example: '123456',
    required: true,
  })
  public executorId: string;

  @ApiProperty({
    description: 'Id задания',
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
