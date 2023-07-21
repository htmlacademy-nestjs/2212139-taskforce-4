import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { fillObject } from '@project/util/util-core';
import { BlogUserService } from './blog-user.service';
import { CustomerBlogUserRdo } from './rdo/customer-blog-user.rdo';
import { UpdateBlogUserDto } from './dto/update-blog-user.dto';
import { ExecuterBlogUserRdo } from './rdo/executer-blog-user.rdo';

@ApiTags('profile')
@Controller('user')
export class BlogUserController {
  constructor(private readonly userService: BlogUserService) {}

  /** Обновление информации пользователя*/
  @ApiResponse({
    type: CustomerBlogUserRdo,
    status: HttpStatus.OK,
    description: 'User update',
  })
  @Patch('update/:id')
  public async update(@Param('id') id: string, @Body() dto: UpdateBlogUserDto) {
    const updatedUser = await this.userService.update(id, dto);
    return fillObject(CustomerBlogUserRdo, updatedUser);
  }

  /** Информация о заказчике*/
  @ApiResponse({
    type: CustomerBlogUserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get('customer/:id')
  public async customer(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillObject(CustomerBlogUserRdo, existUser);
  }

  /** Информация о исполнителе*/
  @ApiResponse({
    type: ExecuterBlogUserRdo,
    status: HttpStatus.OK,
    description: 'User found',
  })
  @Get('executer/:id')
  public async executer(@Param('id') id: string) {
    const existUser = await this.userService.getUser(id);
    return fillObject(ExecuterBlogUserRdo, existUser);
  }
}
