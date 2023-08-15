import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CreateTaskDto } from './dto/create-task.dto';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskQuery } from './task.query';

@ApiTags('task')
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new task has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const createdTask = await this.taskService.create(createTaskDto);
    return fillObject(TaskRdo, createdTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'All tasks query',
  })
  @Get()
  async findAll(@Query() query: TaskQuery) {
    const taskAll = await this.taskService.findAll(query);
    return fillObject(TaskRdo, taskAll);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'Find comment by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const task = await this.taskService.findOne(id);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.OK,
    description: 'Update task',
  })
  @Patch('status/:id')
  async updateTaskStatus(
    @Param('id') taskId: number,
    @Body() dto: UpdateTaskStatusDto
  ) {
    const updatedTask = await this.taskService.updateTaskStatus(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete task',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  async remove(@Param('id') id: number) {
    await this.taskService.remove(id);
  }
}
