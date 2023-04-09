import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { PodeService } from 'src/Service/Purchasing/purchase-order-detail/purchase-order-detail.service';

@Controller('purchase-order-detail')
export class PodeController {
    constructor(
        private podeService: PodeService
    ) { }

    @Get()
    getPode() {
        return this.podeService.findAllPode()
    }

    @Get(':id')
    getPodeId(@Param() params: any) {
        return this.podeService.findPodeId(params.id)
    }

    @Post()
    createPode(@Body() body: any) {
        return this.podeService.addPode(body)
    }

    @Put(':id')
    updatePode(@Param() params: any, @Body() body: any) {
        return this.podeService.editPode(params.id, body)
    }

    @Delete(':id')
    deletePode(@Param() params: any) {
        return this.podeService.dropPode(params.id)
    }

}