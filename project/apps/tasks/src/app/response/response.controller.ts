import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { ResponseService } from './response.service';
import { CreateResponseDto } from './dto/create-response.dto';
import { UpdateResponseDto } from './dto/update-response.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseRdo } from './rdo/response.rdo';
import { fillObject } from '@project/util/util-core';

@ApiTags('Actions with task responses')
@Controller('response')
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Создание отклика на задание',
    type: ResponseRdo,
  })
  @Post()
  async create(@Body() dto: CreateResponseDto) {
    const newResponse = this.responseService.create(dto);
    return fillObject(ResponseRdo, newResponse);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получить все отклики задания',
    type: [ResponseRdo],
  })
  @Get('/:taskId')
  public async findTaskResponses(@Param('taskId') id: string) {
    const existResponses = await this.responseService.findResponsesByTaskId(
      +id
    );
    return fillObject(ResponseRdo, existResponses);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Получить все отклики пользователя',
    type: [ResponseRdo],
  })
  @Get('/:userId')
  async findUserResponses(@Param('userId') userId: string) {
    const existResponses = this.responseService.findResponsesByUserId(userId);
    return fillObject(ResponseRdo, existResponses);
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Выбран исполнитель, оставивший отклик.',
    type: ResponseRdo,
  })
  @Post('/accept/:id')
  async acceptResponse(@Param('id') id: string) {
    const acceptedResponse = await this.responseService.acceptResponse(+id);
    return fillObject(ResponseRdo, acceptedResponse);
  }
}
