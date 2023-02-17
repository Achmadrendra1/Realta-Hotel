import { Controller, Param, Body, Get, Post, Put, Delete } from '@nestjs/common';
import { PurchaseOrderDetailService } from 'src/Service/Purchasing/purchase-order-detail/purchase-order-detail.service';


@Controller('purchase-order-detail')
export class PurchaseOrderDetailController {
    constructor(
        private podeService: PurchaseOrderDetailService
    ) { }

    @Get()
    getPurchaseOrderDetail() {
        return this.podeService.findAllPode();
    }

    @Get(':podeId')
    getPodeId(@Param() podeId: any) {
        return this.podeService.findPodeId(podeId);
    }

    @Post()
    createPurchaseOrderDetail(@Body() pode: any) {
        return this.podeService.addPode(pode);
    }

    @Put(':podeId')
    updatePurchaseOrderDetail(@Body() podeId: any) {
        return this.podeService.editPode(podeId);
    }

    @Delete(':podeId')
    deletePurchaseOrderDetail(@Param() podeId: any) {
        return this.podeService.dropPode(podeId);
    }

}