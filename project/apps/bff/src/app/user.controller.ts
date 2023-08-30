import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  UseFilters,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApplicationServiceURL } from './app.config';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRole } from '@project/shared/app-types';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateBlogUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AxiosExceptionFilter } from './filters/axios-exception.filter';

@ApiTags('users')
@Controller('user')
@UseFilters(AxiosExceptionFilter)
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/register`,
      dto
    );
    return data;
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/login`,
      loginUserDto
    );
    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const { data } = await this.httpService.axiosRef.post(
      `${ApplicationServiceURL.Users}/refresh`,
      null,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    return data;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found.',
  })
  @Get(':id')
  public async show(@Req() req: Request, @Param('id') id: string) {
    const { data } = await this.httpService.axiosRef.get(
      `${ApplicationServiceURL.Users}/${id}`,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );

    if (data.role === UserRole.Customer) {
      const tasksNumber = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Tasks}/customer/${id}/count`
        )
      ).data;
      const newTasksNumber = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Tasks}/customer/${id}/count?status=New`
        )
      ).data;

      return {
        ...data,
        publishedTasksCount: tasksNumber,
        newTasksCount: newTasksNumber,
      };
    } else if (data.role === UserRole.Executor) {
      const completedTasksNumber = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Tasks}/executor/${id}/count?status=Completed`
        )
      ).data;
      const failedTasksNumber = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Tasks}/executor/${id}/count?status=Failed`
        )
      ).data;

      const reviewsNumber = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Reviews}/${id}/data`
        )
      ).data.length;
      const reviewsSum = (
        await this.httpService.axiosRef.get(
          `${ApplicationServiceURL.Reviews}/${id}/sum`
        )
      ).data;

      const ratingTotal = reviewsSum / (reviewsNumber + failedTasksNumber);

      return {
        ...data,
        completedTasksCount: completedTasksNumber,
        failedTasksCount: failedTasksNumber,
        rating: ratingTotal,
      };
    }
  }

  @Patch(':id')
  public async update(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateBlogUserDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/${id}`,
      updateUserDto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }

  @Patch(':id/password')
  public async updatePassword(
    @Req() req: Request,
    @Param('id') id: string,
    @Body() updatePasswordDto: ChangePasswordDto
  ) {
    const { data } = await this.httpService.axiosRef.patch(
      `${ApplicationServiceURL.Users}/${id}/password`,
      updatePasswordDto,
      {
        headers: {
          Authorization: req.headers['authorization'],
        },
      }
    );
    return data;
  }
}
