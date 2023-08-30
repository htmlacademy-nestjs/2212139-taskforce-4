import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { HttpStatusCode } from 'axios';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TaskRdo } from './rdo/task.rdo';
import { TaskQuery } from './task.query';
import { TaskService } from './task.service';
import { UpdateTaskResponseDto } from './dto/update-task-response.dto';

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
    status: HttpStatus.OK,
    description: 'The task found.',
  })
  @Get('/:id')
  async show(@Param('id') id: number) {
    const existTask = await this.taskService.getTask(id);
    return fillObject(TaskRdo, existTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The status of task has been successfully updated.',
  })
  @Patch('/:id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() dto: UpdateTaskStatusDto
  ) {
    const updatedTask = await this.taskService.updateTaskStatus(id, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The executer has been successfully added.',
  })
  @Patch('/:taskId/executor')
  async addExecutorToTask(
    @Param('taskId') taskId: number,
    @Body() dto: UpdateTaskResponseDto
  ) {
    const updatedTask = await this.taskService.addExecutor(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @ApiResponse({
    type: TaskRdo,
    status: HttpStatus.CREATED,
    description: 'The executer has been successfully added.',
  })
  @Patch('/:taskId/response')
  async addResponseToTask(
    @Param('taskId') taskId: number,
    @Body() dto: UpdateTaskResponseDto
  ) {
    const updatedTask = await this.taskService.addResponse(taskId, dto);
    return fillObject(TaskRdo, updatedTask);
  }

  @Get('/')
  async index(@Query() query: TaskQuery) {
    const tasks = await this.taskService.getTasks(query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/:userId/new')
  async getCustomerNewTasks(
    @Param('userId') userId: string,
    @Query() query: TaskQuery
  ) {
    const tasks = await this.taskService.getNewTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/customer/:userId/my')
  async getCustomerTasks(
    @Param('userId') userId: string,
    @Query() query: TaskQuery
  ) {
    const tasks = await this.taskService.getCustomerTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/customer/:userId/count')
  async getCustomerTasksCount(
    @Param('userId') userId: string,
    @Query() query: TaskQuery
  ) {
    const tasks = await this.taskService.getCustomerTasksNumber(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/executer/:executorId/my')
  async getexecuterTasks(
    @Param('userId') userId: string,
    @Query() query: TaskQuery
  ) {
    const tasks = await this.taskService.getExecutorTasks(userId, query);
    return fillObject(TaskRdo, tasks);
  }

  @Get('/executer/:executerId/count')
  async getexecuterTasksCount(
    @Param('executerId') executerId: string,
    @Query() query: TaskQuery
  ) {
    const tasks = await this.taskService.getCustomerTasksNumber(
      executerId,
      query
    );
    return fillObject(TaskRdo, tasks);
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'The task has been successfully deleted.',
  })
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id') id: number) {
    this.taskService.deleteTask(id);
  }
}
