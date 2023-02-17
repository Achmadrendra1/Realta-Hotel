import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { PurchaseOrderHeaderService } from 'src/Service/Purchasing/purchase-order-header/purchase-order-header.service';

@Controller('purchase-order-header')
export class PurchaseOrderHeaderController {
    constructor(
        private poheService: PurchaseOrderHeaderService
    ) { }

    @Get()
    getPurchaseOrderHeader() {
        return this.poheService.findAllPohe();
    }

    @Get(':poheNumber')
    getPoheNumber(@Param() poheNumber: any) {
        return this.poheService.findPoheNumber(poheNumber);
    }

    @Post()
    createPurchaseOrderHeader(@Body() pohe: any) {
        return this.poheService.addPohe(pohe);
    }

    @Put(':poheNumber')
    updatePurchaseOrderHeader(@Body() poheNumber: any) {
        return this.poheService.editPohe(poheNumber);
    }

    @Delete(':poheNumber')
    deletePurchaseOrderHeader(@Param() poheNumber: any) {
        return this.poheService.dropPohe(poheNumber);
    }
}
