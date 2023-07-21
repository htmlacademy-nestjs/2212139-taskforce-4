import { Injectable, NotFoundException } from '@nestjs/common';
import { AUTH_USER_NOT_FOUND } from '../authentication/authentication.constant';
import { BlogUserMemoryRepository } from './blog-user-memory.repository';
import { UpdateBlogUserDto } from './dto/update-blog-user.dto';
import { BlogUserEntity } from './blog-user.entity';

@Injectable()
export class BlogUserService {
  constructor(private readonly blogUserRepository: BlogUserMemoryRepository) {}

  public async update(id: string, dto: UpdateBlogUserDto) {
    const existUser = await this.blogUserRepository.findById(id);
    if (!existUser) {
      throw new NotFoundException(AUTH_USER_NOT_FOUND);
    }

    const userEntity = new BlogUserEntity({ ...existUser, ...dto });

    return this.blogUserRepository.update(id, userEntity);
  }

  public async getUser(id: string) {
    return await this.blogUserRepository.findById(id);
  }
}
