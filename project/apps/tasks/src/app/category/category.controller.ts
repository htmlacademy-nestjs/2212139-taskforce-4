import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { fillObject } from '@project/util/util-core';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { HttpStatusCode } from 'axios';
import { CategoryRdo } from './rdo/category.rdo';

@ApiTags('Actions with Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiResponse({
    status: HttpStatusCode.Created,
    description: 'The new category has been successfully created.',
  })
  @HttpCode(HttpStatusCode.Created)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const newCategory = await this.categoryService.create(dto);
    return fillObject(CategoryRdo, newCategory);
  }

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatusCode.Ok,
    description: 'All categories query',
  })
  @Get()
  async findAll() {
    const categories = await this.categoryService.findAll();
    return fillObject(CategoryRdo, categories);
  }

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatusCode.Ok,
    description: 'Find category by id',
  })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    const category = await this.categoryService.findOne(id);
    return fillObject(CategoryRdo, category);
  }

  @ApiResponse({
    type: CategoryRdo,
    status: HttpStatusCode.Ok,
    description: 'Update category',
  })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() dto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryService.update(id, dto);
    return fillObject(CategoryRdo, updatedCategory);
  }

  @ApiResponse({
    status: HttpStatusCode.NoContent,
    description: 'Delete category',
  })
  @Delete(':id')
  @HttpCode(HttpStatusCode.NoContent)
  async remove(@Param('id') id: number) {
    this.categoryService.delete(id);
  }
}
