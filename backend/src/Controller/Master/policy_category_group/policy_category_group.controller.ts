// import {
//   Controller,
//   Get,
//   Body,
//   Delete,
//   Param,
//   Post,
//   Put,
// } from '@nestjs/common';

// import { PolicyCategoryGroupService } from 'src/Service/Master/policy_category_group/policy_category_group.service';
// @Controller('policy-category-group')
// export class PolicyCategoryGroupController {
//   constructor(private PolicyCategoryGroupService: PolicyCategoryGroupService) {}
//   //find All
//   @Get() 
//   findall(): Promise<any> {
//     return this.PolicyCategoryGroupService.findAllPolicyCategoryGroup();
//   }

//   //find by Id
//   @Get(':id')
//   findById(@Param('id') id: number): Promise<any> {
//     return this.PolicyCategoryGroupService.findOnePolicyCategoryGroup(id);
//   }

//   //find by Name
//   @Get('/name/:name')
//   PolicyName(@Param('name') params): Promise<any> {
//     return this.PolicyCategoryGroupService.getPolicyCategoryGroupByName(params);
//   }
//   //find by Category
//   @Get('policy/:name')
//   async getPolicyByCategory(@Param('name') name: string): Promise<any> {
//     return await this.PolicyCategoryGroupService.getPolicyCategoryGroupByCategory(
//       name,
//     );
//   }

//   //create new
//   @Post('insert')
//   create(@Body() body: any): Promise<any> {
//     return this.PolicyCategoryGroupService.createPolicyCategoryGroup(body);
//   }

//   //update
//   @Put('edit/:id')
//   update(@Param() params, @Body() body: any): Promise<any> {
//     return this.PolicyCategoryGroupService.updatePolicyCategoryGroup(
//       params.id,
//       body,
//     );
//   }

//   //delete
//   @Delete('delete/:id')
//   remove(@Param() params): Promise<any> {
//     return this.PolicyCategoryGroupService.deletePolicyCategoryGroup(params.id);
//   }
// }
