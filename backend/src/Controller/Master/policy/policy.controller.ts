import {
  Controller,
  Get,
  Body,
  Delete,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  //create new
  @Post('create')
  create(@Body() body: any): Promise<any> {
    return this.PolicyService.createPolicy(body);
  }

  //update
  @Put(':id')
  update(@Param() params, @Body() body: any): Promise<any> {
    return this.PolicyService.updatePolicy(params.id, body);
  }

  //delete
  @Delete(':id')
  remove(@Param() params): Promise<any> {
    return this.PolicyService.deletePolicy(params.id);
  }
}
