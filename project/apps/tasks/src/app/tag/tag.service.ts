import { Injectable } from '@nestjs/common';
import { TagRepository } from './tag.repository';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagEntity } from './tag.entity';
import { ITag } from '@project/shared/app-types';

@Injectable()
export class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async createTag(dto: CreateTagDto): Promise<ITag> {
    const tagEntity = new TagEntity(dto);
    return this.tagRepository.create(tagEntity);
  }

  async deleteTag(id: number): Promise<void> {
    await this.tagRepository.destroy(id);
  }

  async getTag(id: number): Promise<ITag | null> {
    return this.tagRepository.findById(id);
  }

  async findByName(name: string): Promise<ITag | null> {
    return this.tagRepository.findByName(name);
  }

  async findOrCreate(name: string): Promise<ITag> {
    return this.tagRepository.findOrCreate(name);
  }

  async findOrCreateMany(names: string[]): Promise<ITag[]> {
    return this.tagRepository.findOrCreateMany(names);
  }

  async getTags(): Promise<ITag[]> {
    return this.tagRepository.find();
  }
}
