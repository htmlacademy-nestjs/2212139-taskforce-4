import { Injectable } from '@nestjs/common';
import { CRUDRepository } from '@project/util/util-types';
import { PrismaService } from '../prisma/prisma.service';
import { ITag } from '@project/shared/app-types';
import { TagEntity } from './tag.entity';

@Injectable()
export class TagRepository implements CRUDRepository<TagEntity, number, ITag> {
  constructor(private readonly prisma: PrismaService) {}

  public async create(item: TagEntity): Promise<ITag> {
    return this.prisma.tag.create({
      data: { ...item.toObject() },
    });
  }

  public async destroy(tagId: number): Promise<void> {
    await this.prisma.tag.delete({
      where: {
        tagId,
      },
    });
  }

  public findById(tagId: number): Promise<ITag | null> {
    return this.prisma.tag.findFirst({
      where: {
        tagId,
      },
    });
  }

  public findByName(name: string): Promise<ITag | null> {
    return this.prisma.tag.findFirst({
      where: { name },
    });
  }

  public async findOrCreate(name: string): Promise<ITag> {
    const existTag = await this.findByName(name);
    if (!existTag) {
      const tag = new TagEntity({ name });
      return await this.create(tag);
    }
    return existTag;
  }

  public async findOrCreateMany(names: string[]): Promise<ITag[]> {
    const tags = [];
    console.log(names);
    names.forEach((name) => {
      const tag = this.findOrCreate(name);
      tags.push(tag);
    });
    return await Promise.all(tags);
  }

  public find(ids: number[] = []): Promise<ITag[]> {
    return this.prisma.tag.findMany({
      where: {
        tagId: {
          in: ids.length > 0 ? ids : undefined,
        },
      },
    });
  }

  public update(id: number, item: TagEntity): Promise<ITag> {
    return this.prisma.tag.update({
      where: {
        tagId: id,
      },
      data: { ...item.toObject(), tagId: id },
    });
  }
}
