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
  public async create(@Body() createTaskDto: CreateTaskDto) {
    const createdTask = await this.taskService.create(createTaskDto);
    return fillObject(TaskRdo, createdTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'All tasks query',
  })
  @Get()
  public async findAll() {
    return await this.taskService.findAll();
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'Find comment by id',
  })
  @Get(':id')
  public async findOne(@Param('id') id: string) {
    const allTasks = await this.taskService.findOne(+id);
    return fillObject(TaskRdo, allTasks);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatusCode.Ok,
    description: 'Update task',
  })
  @Patch(':id')
  public async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    const updatedTask = await this.taskService.update(+id, updateTaskDto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete task',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  public async remove(@Param('id') id: string) {
    await this.taskService.remove(+id);
  }
}
