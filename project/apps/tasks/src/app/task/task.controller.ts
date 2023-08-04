import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { fillObject } from '@project/util/util-core';
import { TaskRdo } from './rdo/task.rdo';

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
  async findAll() {
    const taskAll = await this.taskService.findAll();
    return fillObject(TaskRdo, taskAll);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'Find comment by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOne(+id);
    return fillObject(TaskRdo, task);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'Update task',
  })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.taskService.update(+id, updateTaskDto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete task',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  async remove(@Param('id') id: string) {
    this.taskService.remove(+id);
  }
}
