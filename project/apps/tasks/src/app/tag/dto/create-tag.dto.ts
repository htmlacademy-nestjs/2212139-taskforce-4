import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @ApiProperty({
    description: 'Tag task',
    example: 'delivery',
  })
  public name: string;

  @ApiProperty({
    description: 'Task id',
    example: '4',
  })
  public taskId: number;
}
