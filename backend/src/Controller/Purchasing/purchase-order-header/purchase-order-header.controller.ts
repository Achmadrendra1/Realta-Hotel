import {
    Controller,
    Param,
    Body,
    Get,
    Post,
    Put,
    Delete
} from '@nestjs/common';
import { PoheService } from '../../../Service/Purchasing/purchase-order-header/purchase-order-header.service';

@Controller('purchase-order-header')
export class PoheController {
    constructor(
        private poheService: PoheService
    ) { }

    @Get()
    getPohe() {
        return this.poheService.findAllPohe()
    }

    @Get(':id')
    getPoheId(@Param() params: any) {
        return this.poheService.findPoheId(params.id)
    }

    @Get(':number')
    getPoheNumber(@Param() params: any) {
        return this.poheService.findPoheNumber(params.number)
    }

    @Post()
    createPohe(@Body() body: any) {
        return this.poheService.addPohe(body)
    }

    @Put(':id')
    updatePohe(@Param() params: any, @Body() body: any) {
        return this.poheService.editPohe(params.id, body)
    }

    @Delete(':id')
    deletePohe(@Param() params: any) {
        return this.poheService.dropPohe(params.id)
    }
}
