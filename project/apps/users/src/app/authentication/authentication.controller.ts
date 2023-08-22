import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRdo } from './rdo/user.rdo';
import { fillObject } from '@project/util/util-core';
import { LoginUserDto } from './dto/login-user.dto';
import { LoggedUserRdo } from './rdo/logged-user.rdo';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MongoidValidationPipe } from '@project/shared/shared-pipes';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateBlogUserDto } from '../blog-user/dto/update-blog-user.dto';
import { CustomerBlogUserRdo } from '../blog-user/rdo/customer-blog-user.rdo';
import { UserRole } from '@project/shared/app-types';
import { NotifyService } from '../notify/notify.service';

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
    const { email, name } = newUser;
    await this.notifyService.registerSubscriber({ email, name });
    return fillObject(UserRdo, newUser);
  }

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
  public async login(@Body() dto: LoginUserDto) {
    const verifiedUser = await this.authService.verifyUser(dto);
    const loggedUser = await this.authService.createUserToken(verifiedUser);
    return fillObject(LoggedUserRdo, Object.assign(verifiedUser, loggedUser));
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
    return fillObject(UserRdo, existUser);
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
      return fillObject(CustomerBlogUserRdo, updatedUser);
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
  @Patch('change')
  @HttpCode(HttpStatus.OK)
  public async changePassword(@Body() dto: ChangePasswordDto) {
    const userEntity = await this.authService.changePassword(dto);
    return fillObject(LoggedUserRdo, userEntity);
  }
}
