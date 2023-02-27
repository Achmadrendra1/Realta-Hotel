import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Policy } from 'src/entities/Policy';
import { PolicyService } from 'src/Service/Master/policy/policy.service';
@Controller('policy')
export class PolicyController {
  constructor(private PolicyService: PolicyService) {}

  //find All
  @Get()
  findall(): Promise<any> {
    return this.PolicyService.findAllPolicy();
  }

  //find by Id
  @Get(':id')
  findById(@Param('id') id: number): Promise<any> {
    return this.PolicyService.findOnePolicy(id);
  }

  //find by Name
  @Get('/name/:name')
  PolicyName(@Param('name') params): Promise<any> {
    return this.PolicyService.getPolicyByName(params);
  }
  //find by Category
  @Get('category/:name')
  async getPolicyByCategory(@Param('name') name: string): Promise<any> {
    return await this.PolicyService.getPolicyByCategory(name);
  }

  //create new
  @Post('insert')
  async createPolicy(@Body() data: Policy) {
    const policy = await this.PolicyService.createPolicy(data);
    if (!policy) {
      return 'failed insert to policy';
    } else {
      return ' success insert to policy';
    }
  }

  //update
  @Put('edit/:id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.PolicyService.updatePolicy(params.id, body);
  }

  //delete
  @Delete('delete/:id')
  async remove(@Param() params): Promise<any> {
    const policy = await this.PolicyService.deletePolicy(params.id);
    if (policy) {
      return ' failed delete policy';
    } else {
      return ' success delete data policy';
    }
  }
}
