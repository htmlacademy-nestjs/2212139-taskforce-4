import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { fillObject } from '@project/util/util-core';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateBlogUserDto } from '../blog-user/dto/update-blog-user.dto';
import { CustomerBlogUserRdo } from '../blog-user/rdo/customer-blog-user.rdo';
import {
  IRequestWithTokenPayload,
  RequestWithUser,
  UserRole,
} from '@project/shared/app-types';
import { NotifyService } from '../notify/notify.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtRefreshGuard } from './guards/jwt-refresh.guard';
import { ExecuterBlogUserRdo } from '../blog-user/rdo/executer-blog-user.rdo';
import { CustomerUserRdo } from './rdo/customer-user.rdo';
import { ExecutorUserRdo } from './rdo/executor-user.rdo';
import { UserRdo } from './rdo/user.rdo';

@ApiTags('authentication')
@Controller('auth')
export class AuthenticationController {
  constructor(
    private readonly authService: AuthenticationService,
    private readonly notifyService: NotifyService
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The new user has been successfully created.',
  })
  @Post('register')
  public async create(@Body() dto: CreateUserDto) {
    const newUser = await this.authService.register(dto);
    const { email, name, role } = newUser;
    await this.notifyService.registerSubscriber({ email, name });

    if (role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, newUser);
    } else if (role === UserRole.Executor) {
      return fillObject(ExecutorUserRdo, newUser);
    }
  }

  @UseGuards(LocalAuthGuard)
  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'User has been successfully logged.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @ApiResponse({
    type: UserRdo,
    status: HttpStatus.OK,
    description: 'User found.',
  })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async show(@Param('id', MongoidValidationPipe) id: string) {
    const existUser = await this.authService.getUser(id);

    if (existUser.role === UserRole.Customer) {
      return fillObject(CustomerUserRdo, existUser);
    } else if (existUser.role === UserRole.Executor) {
      return fillObject(ExecutorUserRdo, existUser);
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User has been successfully updated.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id', MongoidValidationPipe) id: string,
    @Body() dto: UpdateBlogUserDto
  ) {
    const updatedUser = await this.authService.update(id, dto);
    if (updatedUser.role === UserRole.Customer) {
      return fillObject(CustomerBlogUserRdo, updatedUser);
    } else if (updatedUser.role === UserRole.Executor) {
      return fillObject(ExecuterBlogUserRdo, updatedUser);
    }
  }

  @ApiResponse({
    type: LoggedUserRdo,
    status: HttpStatus.OK,
    description: 'New password changed.',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Password or Login is wrong.',
  })
  @UseGuards(JwtAuthGuard)
  @Patch('change')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: ChangePasswordDto) {
    console.log(dto);

    const userEntity = await this.authService.changePassword(dto);
    return fillObject(LoggedUserRdo, userEntity);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Get a new access/refresh tokens',
  })
  public async refreshToken(@Req() { user }: RequestWithUser) {
    return this.authService.createUserToken(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('check')
  public async checkToken(@Req() { user: payload }: IRequestWithTokenPayload) {
    return payload;
  }
}
