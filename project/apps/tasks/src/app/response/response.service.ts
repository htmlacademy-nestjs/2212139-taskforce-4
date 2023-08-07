import { BadRequestException, Injectable } from '@nestjs/common';
import { IResponse, ITask } from '@project/shared/app-types';
import { ResponseRepository } from './response.repository';
import { ResponseEntity } from './response.entity';
import { CreateResponseDto } from './dto/create-response.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly taskService: TaskService
  ) {}

  async create(dto: CreateResponseDto): Promise<IResponse> {
    const responseEntity = new ResponseEntity(dto);
    return this.responseRepository.create(responseEntity);
  }

  async delete(id: number): Promise<void> {
    this.responseRepository.destroy(id);
  }

  async findResponsesByTaskId(id: number): Promise<IResponse[]> {
    return this.responseRepository.findByTaskId(+id);
  }

  async findResponsesByUserId(id: string): Promise<IResponse[]> {
    return this.responseRepository.findByUserId(id);
  }

  async acceptResponse(responseId: number): Promise<ITask | null> {
    const response = await this.responseRepository.findById(responseId);
    const allTaskResponses = await this.findResponsesByTaskId(response.taskId);
    if (allTaskResponses.includes(response)) {
      return await this.taskService.setAcceptedResponse(response);
    } else {
      throw new BadRequestException('Response not found');
    }
  }
}
