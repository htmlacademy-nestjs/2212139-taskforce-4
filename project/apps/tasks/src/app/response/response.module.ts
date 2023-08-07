import { Module } from '@nestjs/common';
import { ResponseService } from './response.service';
import { ResponseController } from './response.controller';
import { ResponseRepository } from './response.repository';

@Module({
  controllers: [ResponseController],
  providers: [ResponseService, ResponseRepository],
  exports: [ResponseRepository],
})
export class ResponseModule {}
