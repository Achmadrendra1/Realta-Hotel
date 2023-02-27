import {
    Controller,
    Get,
    Body,
    Delete,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  
  import { PolicyCategoryGroupService } from 'src/Service/Master/policy_category_group/policy_category_group.service';
@Controller('policy-category-group')
export class PolicyCategoryGroupController {
    constructor(private PolicyCategoryGroupService: PolicyCategoryGroupService) {}

    // //find All
    // @Get()
    // findall(): Promise<any> {
    //   return this.PolicyCategoryGroupService.findAllAddress();
    // }
  
    // //find by Id
    // @Get(':id')
    // findById(@Param('id') id: number): Promise<any> {
    //   return this.PolicyCategoryGroupService.findOneAddress(id);
    // }
  
    // //create new
    // @Post('create')
    // create(@Body() body: any): Promise<any> {
    //   return this.PolicyCategoryGroupService.createAddress(body);
    // }
  
    // //update
    // @Put(':id')
    // update(@Param() params, @Body() body: any): Promise<any> {
    //   return this.PolicyCategoryGroupService.updateAddress(params.id, body);
    // }
  
    // //delete
    // @Delete(':id')
    // remove(@Param() params): Promise<any> {
    //   return this.PolicyCategoryGroupService.deleteAddress(params.id);
    // }
}
