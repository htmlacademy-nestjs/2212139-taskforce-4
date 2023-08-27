import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { UserController } from './user.controller';
import { HTTP_CLIENT_TIMEOUT, HTTP_CLIENT_MAX_REDIRECTS } from './app.config';
import { HttpModule } from '@nestjs/axios';
import { CheckAuthGuard } from './guards/check-auth.guard';

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_CLIENT_TIMEOUT,
      maxRedirects: HTTP_CLIENT_MAX_REDIRECTS,
    }),
  ],
  controllers: [UserController, TaskController],
  providers: [CheckAuthGuard],
})
export class AppModule {}
