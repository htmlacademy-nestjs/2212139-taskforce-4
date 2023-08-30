import { Injectable } from '@nestjs/common';
import { IResponse } from '@project/shared/app-types';
import { ResponseRepository } from './response.repository';
import { ResponseEntity } from './response.entity';
import { CreateResponseDto } from './dto/create-response.dto';

@Injectable()
export class ResponseService {
  constructor(private readonly responseRepository: ResponseRepository) {}

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
}
