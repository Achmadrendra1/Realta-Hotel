import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryGroupService } from 'src/Service/Master/category_group/category_group.service';

@Controller('category')
export class CategoryGroupController {
  constructor(private CategoryGroupService: CategoryGroupService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.CategoryGroupService.findAllCategoryGroup();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.CategoryGroupService.findOneCategoryGroup(id);
  }

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.CategoryGroupService.createCategoryGroup(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.CategoryGroupService.updateCategoryGroup(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.CategoryGroupService.deleteCategoryGroup(params.id);
  }
}
