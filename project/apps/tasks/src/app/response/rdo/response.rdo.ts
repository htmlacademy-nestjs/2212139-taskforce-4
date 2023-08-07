import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class ResponseRdo {
  @ApiProperty({
    description: 'Уникальный идентификатор отклика',
    example: '1',
    required: true,
  })
  @Expose()
  public responseId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор задания',
    example: '2',
    required: true,
  })
  @Expose()
  public taskId: string;

  @ApiProperty({
    description: 'Уникальный идентификатор исполнителя',
    example: '2',
    required: true,
  })
  @Expose()
  public userId: string;

  @ApiProperty({
    description: 'Цена за работу',
    example: '99',
    required: true,
  })
  @Expose()
  public offerPrice: string;
}
