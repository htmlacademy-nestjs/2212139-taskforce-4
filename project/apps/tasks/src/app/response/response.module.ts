import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './response.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [PrismaModule, TaskModule],
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
  exports: [ResponseRepository],
})
export class ResponseModule {}
