import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { ServiceTask } from 'src/entities/ServiceTask';
import { CategoryGroupService } from 'src/Service/Master/category_group/category_group.service';
import { CategoryGroup } from 'src/entities/CategoryGroup';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

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

  //find by Name
  @Get('/name/:name')
  categoryName(@Param('name') params): Promise<any> {
    return this.CategoryGroupService.getCategoryGroupByName(params);
  }

  //create new
  @Post('insert')
  async createCategoryGroup(@Body() data: CategoryGroup) {
    const CategoryGroup = await this.CategoryGroupService.createCategoryGroup(
      data,
    );
    if (!CategoryGroup) {
      return 'failed insert to Category';
    } else {
      return ' success insert to Category';
    }
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './public/upload',
      storage: diskStorage({
        destination: './public/upload',
        filename(req, file, cb) {
          return cb(null, file.originalname);
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: any, @Body() body) {
    console.log(file);
    const result = await this.CategoryGroupService.storeFileInfo(file, body);
    if (!result) {
      return 'gagal upload';
    } else {
      return {
        message: 'berhasil upload',
        result: result.result,
      };
    }
  }
  // upload
  @Get('public/upload/:fileName')
  getPhoto(@Param('fileName') fileName: string, @Res() res) {
    return res.sendFile(fileName, { root: join('public/upload') });
  }

  // upload end

  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.CategoryGroupService.updateCategoryGroup(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  remove(@Param() params): Promise<any> {
    return this.CategoryGroupService.deleteCategoryGroup(params.id);
  }
}
