import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './response.repository';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
  exports: [ResponseRepository, ResponseService],
})
export class ResponseModule {}
